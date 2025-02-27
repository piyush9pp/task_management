import useTasks from "./hooks/useTasks";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Container, Typography, Box, Paper } from "@mui/material";

function App() {
    const { tasks, loading, addTask, updateTaskStatus } = useTasks();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)",
                padding: 4,
            }}
        >
            <Container maxWidth="md">
                <Paper
                    sx={{
                        padding: 4,
                        borderRadius: 3,
                        textAlign: "center",
                        backdropFilter: "blur(10px)",
                        background: "rgba(255, 255, 255, 0.2)", // Transparent White
                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", // Soft shadow
                        border: "1px solid rgba(255, 255, 255, 0.3)", // Soft border
                    }}
                >
                    <Typography variant="h4" color="primary" gutterBottom>
                        Task Management System
                    </Typography>
                    <TaskForm addTask={addTask} />
                    {loading ? (
                        <Typography variant="body1" color="text.secondary">
                            Loading tasks...
                        </Typography>
                    ) : (
                        <TaskList tasks={tasks} updateTaskStatus={updateTaskStatus} />
                    )}
                </Paper>
            </Container>
        </Box>
    );
}

export default App;
