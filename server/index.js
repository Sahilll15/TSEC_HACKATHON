const express = require('express');
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes')
const roomRoutes = require('./routes/room.routes')
const taskRoutes = require('./routes/task.routes')
const messageRoutes = require('./routes/message.routes')
const chatRoutes = require('./routes/chat.routes')
const ownerRoutes = require('./routes/owner.routes')
const { Server } = require('socket.io');
const socketCtrl = require('./controllers/socket.controller')
const feedbackRoutes = require('./routes/feedback.routes')
const contractorRoutes = require('./routes/contractors.routes')

const app = express();
require('dotenv').config()
const cors = require('cors')

const mongoose = require('mongoose');


app.use(cors())
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.use('/uploads', express.static('uploads'));



const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})



const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: '*',
    },
});

socketCtrl(io);

mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('DB Connected'));

app.use('/api/v1/feedback', feedbackRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/project', projectRoutes);
app.use('/api/v1/room', roomRoutes);
app.use('/api/v1/task', taskRoutes);
app.use('/api/v1/message', messageRoutes);
app.use('/api/v1/chat', chatRoutes);
app.use('/api/v1/owner', ownerRoutes);
app.use('/api/v1/contractor', contractorRoutes);

