module.exports = function pre(client, body) {

    if (body.action === "set") 
    {
        if (body.details === "crowdin.com") 
        {
            const arrayUrl = body.smallText.split('/');

            if (body.smallText === "https://crowdin.com/") {
                body.largeText = "Na página inicial"
                client.setActivity({
                    state: body.state,
                    details: body.largeText,
                    startTimestamp: new Date(),
                    largeImageKey: "crowdin",
                    instance: true,
                    type: 2,
                }).then(console.log, console.error);
            } 
            else if (body.smallText.includes("crowdin.com/translate/"))
            {
                const labelText = body.smallText.split(body.smallText.split('/')[5])[0];

                var arquivo = body.largeText.split(' - ')[0];
                if (arquivo === "All Strings")
                    arquivo = "Vendo todas as strings!"
                else
                    arquivo = "Arquivo: " + body.largeText.split(' - ')[0]; 
                
                body.state = arquivo;
                body.largeText = "Traduzindo: " + body.largeText.split(' - ')[1];
                client.setActivity({
                    state: body.state,
                    details: body.largeText,
                    startTimestamp: new Date(),
                    largeImageKey: arrayUrl[4],
                    //largeImageText: body.largeText || body.title,
                    //smallImageKey: 'chrome',
                    //smallImageText: body.smallText,
                    instance: true,
                    type: 2,
                    buttons: [{ label: "Ajudar na tradução", url: labelText }]
                }).then(console.log, console.error);
            }
            else if (body.smallText.includes("crowdin.com/proofread/")) {
                const labelText = body.smallText.split(body.smallText.split('/')[5])[0];

                var arquivo = body.largeText.split(' - ')[0];
                if (arquivo === "All Strings")
                    arquivo = "Vendo todas as strings!"
                else
                    arquivo = "Arquivo: " + body.largeText.split(' - ')[0]; 
                
                body.state = arquivo;
                body.largeText = "Revisando: " + body.largeText.split(' - ')[1];
                client.setActivity({
                    state: body.state,
                    details: body.largeText,
                    startTimestamp: new Date(),
                    largeImageKey: arrayUrl[4],
                    //largeImageText: body.largeText || body.title,
                    //smallImageKey: 'chrome',
                    //smallImageText: body.smallText,
                    instance: true,
                    type: 2,
                    buttons: [{ label: "Ajudar na tradução", url: labelText }]
                }).then(console.log, console.error);
            }
           //else if (arrayUrl === 5) 
           // {
           //     const labelText = body.smallText.split(body.smallText.split('/')[5])[0];
           //     body.largeText = "No projeto: " + body.largeText.split(' dashboard ')[0];
           //     //body.state = "Configurando Projeto: " + body.largeText.split(' dashboard ')[0];
           //     client.setActivity({

           //         state: body.state,
           //         details: body.largeText,
           //         startTimestamp: new Date(),
           //         largeImageKey: "crowdin",
           //         //largeImageText: body.largeText || body.title,
           //         //smallImageKey: 'chrome',
           //         //smallImageText: body.smallText,
           //         instance: true,
           //         type: 2,
           //         buttons: [{ label: "Ajudar na tradução", url: labelText }]
           //     }).then(console.log, console.error);
           // }
            else if (arrayUrl => 5 && arrayUrl[3] === "project") 
            {
                const labelText = body.smallText.split(body.smallText.split('/')[5])[0];
                if (body.largeText.includes(' dashboard '))
                    body.largeText = "No projeto: " + body.largeText.split(' dashboard ')[0];
                else if (body.largeText.includes(' to '))
                    body.largeText = "No projeto: " + body.largeText.split(' to ')[0].split('Translating ')[1];

                //body.state = "Página" + body.title
                
                client.setActivity({
                    state: body.state,
                    details: body.largeText,
                    startTimestamp: new Date(),
                    largeImageKey: arrayUrl[4],
                    //largeImageText: body.largeText || body.title,
                    //smallImageKey: arrayUrl[4],
                    //smallImageText: body.smallText,
                    instance: true,
                    type: 2,
                    buttons: [{ label: "Ajudar na tradução", url: labelText }]
                }).then(console.log, console.error);
            }
            else 
            {
                client.setActivity({
                    state: body.state,
                    details: body.largeText,
                    startTimestamp: new Date(),
                    largeImageKey: "crowdin",
                    //largeImageText: body.largeText || body.title,
                    //smallImageKey: 'chrome',
                    //smallImageText: body.smallText,
                    instance: true,
                    type: 2
                    //buttons: [{ label: "View", url: body.smallText }]
                }).then(console.log, console.error);
            }
        }
        else
        {
            client.setActivity({
                state: body.state,
                details: body.largeText,
                startTimestamp: new Date(),
                largeImageKey: "crowdin",
                //largeImageText: body.largeText || body.title,
                //smallImageKey: 'chrome',
                //smallImageText: body.smallText,
                instance: true,
                type: 2
                //buttons: [{ label: "View", url: body.smallText }]
            }).then(console.log, console.error);

            //client.clearActivity();
            //client.setActivity({
            //    state: body.state,
            //    details: body.details,
            //    startTimestamp: new Date(),
            //    largeImageKey: "chrome",
            //    largeImageText: body.largeText || body.title,
            //    smallImageKey: 'chromeium',
            //    smallImageText: body.smallText.includes("search") && body.smallText.length >= 128 ? body.title : body.smallText,
            //    instance: true
            //}).then(console.log, console.error);
        }
    } 
    else if (body.action === "clear") 
    {
        client.clearActivity();
    }
    else
    {
        client.clearActivity();
    }
}