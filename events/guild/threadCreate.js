//The Module
module.exports = async (client, thread) => {
    try{
        if(thread.joinable && !thread.joined){
            await thread.join();
        }
    }catch (e){
        console.log(String(e).grey)
    }
}
/**
 * @INFO
 * Bot Coded by Mike | https://redmibot.es/
 * @INFO
 * Work for Milrato Development | https://redmibot.es/
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */
