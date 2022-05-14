import { Mida, } from "@reiryoku/mida";
import { BinancePlugin } from "@reiryoku/mida-binance";
import { MyTradingStrategy, } from "./src/my-trading-strategy.js";

Mida.use(new BinancePlugin());

(async () => {
    // Read the documentation to use other trading platforms
    // Binance Spot account login
    const myAccount = await Mida.login("Binance/Spot", {
        apiKey: "...",
        apiSecret: "...",
    });

    // Create instance of a trading bot
    const myTradingBot = new MyTradingStrategy({
        tradingAccount: myAccount,
    });

    // Start the trading bot
    await myTradingBot.start();

    // Stop the trading bot after 10 minutes
    setTimeout(async () => {
        await myTradingBot.stop();
    }, 1000 * 60 * 10);
})();
