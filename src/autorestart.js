// NPM
const consola = require('consola')
const pm2 = require('pm2')

/**************************************************************************
 * START PM2 PROGRAMATICALLY
 ***************************************************************************/

pm2.connect((error) => {
    if (error) {
        console.error(error)
        process.exit(2)
    }

    pm2.start({ script: 'app.js' }, (error, apps) => {
        pm2.disconnect() // Disconnects from PM2

        if (error) {
            console.error(error)
            process.exit(2)
        }
    })

    // Kill the process if taking longer than expected
    setInterval(() => {
        pm2.describe('app.js', (error, scripts) => {
            const exitTimeout = 5
            const uptime = Date.now() - scripts[0].pm2_env.pm_uptime

            if (uptime > exitTimeout * 60 * 1000) {
                consola.info(`Closing cluster after ${exitTimeout} minutes...`)

                pm2.restart('app.js', (error) => {
                    if (error) {
                        console.error(error)
                        process.exit(2)
                    }
                })
            }
        })
    }, 180 * 1000)
})