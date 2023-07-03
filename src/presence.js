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
                const labelText = body.smallText.split(body.smallText.split('/')[5])[0].replace("translate", "project");
                const projeto = body.largeText.split(' - ')[1];
                const language = arrayUrl[6].split('?')[0].split('-')[1];
                try
                {
                    language = language.toLowerCase().replace('-', '');
                } catch (err)
                {
                    console.log(err);
                }

                var arquivo = body.largeText.split(' - ')[0];
                if (arquivo === "All Strings")
                    arquivo = "Vendo todas as strings!"
                else
                    arquivo = "Arquivo: " + arquivo; 
                
                const project = arrayUrl[4];
                try
                {
                    project = project.toLowerCase();
                } catch (err)
                {
                    console.log(err);
                }
                
                body.state = arquivo;
                body.largeText = "Traduzindo: " + projeto;
                client.setActivity({
                    state: body.state,
                    details: body.largeText,
                    startTimestamp: new Date(),
                    largeImageKey: project,
                    largeImageText: projeto,
                    smallImageKey: language,
                    instance: true,
                    type: 2,
                    buttons: [{ label: "Ajudar na tradução", url: labelText }]
                }).then(console.log, console.error);
            }
            else if (body.smallText.includes("crowdin.com/proofread/")) {
                const labelText = body.smallText.split(body.smallText.split('/')[5])[0].replace("proofread", "project");
                const projeto = body.largeText.split(' - ')[1];
                const language = arrayUrl[6].split('?')[0].split('-')[1];
                try
                {
                    language = language.toLowerCase().replace('-', '');
                } catch (err)
                {
                    console.log(err);
                }
                
                var arquivo = body.largeText.split(' - ')[0];
                if (arquivo === "All Strings")
                    arquivo = "Vendo todas as strings!"
                else
                    arquivo = "Arquivo: " + body.largeText.split(' - ')[0]; 
                
                const project = arrayUrl[4];
                try
                {
                    project = project.toLowerCase();
                } catch (err)
                {
                    console.log(err);
                }

                body.state = arquivo;
                body.largeText = "Revisando: " + projeto;
                client.setActivity({
                    state: body.state,
                    details: body.largeText,
                    startTimestamp: new Date(),
                    largeImageKey: project,
                    smallImageKey: language,
                    instance: true,
                    type: 2,
                    buttons: [{ label: "Ajudar na tradução", url: labelText }]
                }).then(console.log, console.error);
            }
            else if (arrayUrl[3] === "project") 
            {
                const labelText = body.smallText.split(body.smallText.split('/')[5])[0];
                if (body.largeText.includes(' dashboard '))
                    body.largeText = "No projeto: " + body.largeText.split(' dashboard ')[0];
                else if (body.largeText.includes(' to '))
                    body.largeText = "No projeto: " + body.largeText.split(' to ')[0].split('Translating ')[1];
                
                const project = arrayUrl[4];
                try
                {
                    project = project.toLowerCase();
                } catch (err)
                {
                    console.log(err);
                }
                const language = arrayUrl[5];
                try
                {
                    language = language.toLowerCase().replace('-', '');
                } catch (err)
                {
                    console.log(err);
                }

                client.setActivity({
                    state: body.state,
                    details: body.largeText,
                    startTimestamp: new Date(),
                    largeImageKey: project,
                    smallImageKey: language,
                    instance: true,
                    type: 2,
                    buttons: [{ label: "Ajudar na tradução", url: labelText }]
                }).then(console.log, console.error);
            }
            else if (arrayUrl[3] === "profile") 
            {
                body.largeText = "No perfil";

                client.setActivity({
                    state: body.state,
                    details: body.largeText,
                    startTimestamp: new Date(),
                    largeImageKey: 'crowdin',
                    instance: true,
                    type: 2,
                    buttons: [{ label: "Ver perfil do usuário", url: body.smallText }]
                }).then(console.log, console.error);
            }
            else if (arrayUrl[3].includes("settings")) 
            {
                body.largeText = "Editando perfil";

                client.setActivity({
                    state: body.state,
                    details: body.largeText,
                    startTimestamp: new Date(),
                    largeImageKey: 'crowdin',
                    instance: true,
                    type: 2,
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
            client.clearActivity();
            //client.setActivity({
            //    state: body.state,
            //    details: body.largeText,
            //    //startTimestamp: new Date(),
            //    //largeImageKey: "crowdin",
            //    //largeImageText: body.largeText || body.title,
            //    //smallImageKey: 'chrome',
            //    //smallImageText: body.smallText,
            //    instance: true,
            //    type: 2
            //    //buttons: [{ label: "View", url: body.smallText }]
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