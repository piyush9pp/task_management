import { useState } from "react";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, Card, CardContent, Box } from "@mui/material";
import { MdAddTask } from "react-icons/md"; // React Icon

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("Medium");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !dueDate) {
            alert("Title and Due Date are required!");
            return;
        }
        addTask({ title, description, due_date: dueDate, priority });
        setTitle("");
        setDescription("");
        setDueDate("");
        setPriority("Medium");
    };

    return (
        <Card
            sx={{
                maxWidth: 450,
                mx: "auto",
                p: 3,
                mb: 2,
                boxShadow: 4,
                bgcolor: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(8px)",
                borderRadius: 3,
            }}
        >
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                    <MdAddTask size={28} color="#1976D2" style={{ marginRight: 8 }} />
                    <Typography variant="h4" color="primary" fontWeight="bold">
                        Add Task
                    </Typography>
                </Box>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={2}
                        fullWidth
                        size="small"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        label="Due Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                    <FormControl fullWidth size="small">
                        <InputLabel>Priority</InputLabel>
                        <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ textTransform: "none", fontSize: "16px" }}>
                        Add Task
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TaskForm;
