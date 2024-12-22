import 'dotenv/config';
import express from 'express';
import routes from './routes/index'
import {sequelize} from './db/config';

const app = express();
const PORT = process.env.NODE_PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true}));


app.use('/api', routes)

const main = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        // await sequelize.sync({force: true});
        app.listen(PORT, () => console.log(`Сервер запущен, порт: ${PORT}`));
    } catch (e) {
        console.error(e)
    }
}

main();