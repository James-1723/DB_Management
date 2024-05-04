import cors from 'cors';

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,POST,DELETE'
};

export default cors(corsOptions);
