import { useState } from "react";
import TaskItem from "./TaskItem";
import { FormGroup, FormControlLabel, Checkbox, Typography, Paper, Box } from "@mui/material";
import { motion } from "framer-motion";

const TaskList = ({ tasks, updateTaskStatus }) => {
    const [showHighPriority, setShowHighPriority] = useState(false);
    const [showDueSoon, setShowDueSoon] = useState(false);

    const filteredTasks = tasks.filter((task) => {
        if (showHighPriority && task.priority !== "High") return false;
        if (showDueSoon && new Date(task.due_date) > new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)) return false;
        return true;
    });

    return (
        <Paper
            sx={{
                maxWidth: 600,
                mx: "auto",
                p: 3,
                mt: 2,
                boxShadow: 4,
                bgcolor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(8px)",
                borderRadius: 3,
                transition: "all 0.3s ease-in-out",
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.0 }}
        >
            <Typography variant="h4" color="primary" fontWeight="bold" align="center" gutterBottom>
                Task List
            </Typography>

            <FormGroup row sx={{ justifyContent: "center", mb: 2 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showHighPriority}
                            onChange={() => setShowHighPriority(!showHighPriority)}
                            color="primary"
                        />
                    }
                    label="Show High Priority"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showDueSoon}
                            onChange={() => setShowDueSoon(!showDueSoon)}
                            color="secondary"
                        />
                    }
                    label="Show Due Soon"
                />
            </FormGroup>

            <Box>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <motion.div
                            key={task.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                        >
                            <TaskItem key={task.id} task={task} updateTaskStatus={updateTaskStatus} />
                        </motion.div>
                    ))
                ) : (
                    <Typography variant="body2" color="text.secondary" align="center">
                        No tasks found.
                    </Typography>
                )}
            </Box>
        </Paper>
    );
};

export default TaskList;
