import { Card, CardContent, Typography, FormControl, Select, MenuItem, InputLabel, Box } from "@mui/material";
import { motion } from "framer-motion";

const getPriorityColor = (priority) => {
    switch (priority) {
        case "High":
            return { border: "#d32f2f", hoverBg: "rgba(211, 47, 47, 0.15)" }; // Light Red
        case "Medium":
            return { border: "#fbc02d", hoverBg: "rgba(255, 193, 7, 0.15)" }; // Light Yellow
        case "Low":
            return { border: "#388e3c", hoverBg: "rgba(56, 142, 60, 0.15)" }; // Light Green
        default:
            return { border: "#1976d2", hoverBg: "rgba(25, 118, 210, 0.15)" }; // Default Blue
    }
};

const TaskItem = ({ task, updateTaskStatus }) => {
    const { border, hoverBg } = getPriorityColor(task.priority);

    const handleStatusChange = (e) => {
        updateTaskStatus(task.id, e.target.value);
    };

    return (
        <motion.div
            whileHover={{ backgroundColor: hoverBg, scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <Card
                sx={{
                    mb: 2,
                    p: 2,
                    boxShadow: 2,
                    bgcolor: "background.paper",
                    borderLeft: `6px solid ${border}`,
                    transition: "background-color 0.3s ease-in-out",
                }}
            >
                <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                        {task.title} ({task.priority})
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        {task.description || "No description provided."}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color="text.primary">
                        Due: {new Date(task.due_date).toLocaleDateString()}
                    </Typography>
                    <Box mt={2}>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select value={task.status} onChange={handleStatusChange}>
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default TaskItem;
