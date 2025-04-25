import express from 'express';
import axios from 'axios';


export const app = express()
app.use(express.json())

const REMOTE_API = 'https://jsonplaceholder.typicode.com/'


function handleError(e: any, res: express.Response) {
    if (axios.isAxiosError(e) && e.response) {
        res.status(e.response.status).json(e.response.data)
    } else {
        res.status(500).json({error: 'Internal server error'})
    }
}

app.get('/posts', async (_req, res) => {
    try {
        const response = await axios.get(`${REMOTE_API}/posts`)
        res.status(response.status).json(response.data)
    } catch (e) {
        handleError(e, res)
    }
})

app.get('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${REMOTE_API}/posts/${id}`);
    res.status(response.status).json(response.data);
  } catch (err) {
    handleError(err, res);
  }
});

// GET /posts/:id/comments → comments for a post
app.get('/posts/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${REMOTE_API}/posts/${id}/comments`);
    res.status(response.status).json(response.data);
  } catch (err) {
    handleError(err, res);
  }
});

// GET /comments?postId=1 → filter comments by query
app.get('/comments', async (req, res) => {
  try {
    const response = await axios.get(`${REMOTE_API}/comments`, { params: req.query });
    res.status(response.status).json(response.data);
  } catch (err) {
    handleError(err, res);
  }
});

// POST /posts → create a new post
app.post('/posts', async (req, res) => {
  try {
    const response = await axios.post(`${REMOTE_API}/posts`, req.body);
    res.status(response.status).json(response.data);
  } catch (err) {
    handleError(err, res);
  }
});