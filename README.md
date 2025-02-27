# 📝 Task Management System

A full-stack **Task Management System** built with **React (Frontend), Node.js + Express (Backend), and PostgreSQL (Database)**.

## 🚀 Features
✅ Create, update, and delete tasks  
✅ Task filtering (High Priority, Due Soon)  
✅ Task status updates (Pending → In Progress → Completed)  
✅ PostgreSQL trigger to auto-mark overdue tasks  
✅ Middleware for API logging & validation  

---

## 📂 Project Structure
```
task-management/
│── backend/ (Node.js + Express + PostgreSQL)
│── frontend/ (ReactJS + Hooks + Local State)
│── api-gateway/ (Express Middleware)
│── README.md (Setup Instructions)
```

---

## 🔧 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/task-management.git
cd task-management
```

### **2️⃣ Setup Backend**
```sh
cd backend
npm install
```

Create a **`.env`** file inside `backend/` and add:
```env
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=task_management
DB_PORT=5432
```

**Start the Backend**
```sh
npx nodemon server.js
```
If successful:
```
Server running on port 5000
Database connected successfully!
```

---

### **3️⃣ Setup Frontend**
```sh
cd frontend
npm install
npm start
```
App should open at **`http://localhost:3000`**.

---

## 🛠️ PostgreSQL Database Setup

Create the database:
```sql
CREATE DATABASE task_management;
```

Run the SQL schema:
```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    due_date TIMESTAMP CHECK (due_date > NOW()),
    status VARCHAR(50) CHECK (status IN ('Pending', 'In Progress', 'Completed')) DEFAULT 'Pending',
    priority VARCHAR(20) CHECK (priority IN ('Low', 'Medium', 'High')) DEFAULT 'Medium'
);
```

### **🟥 PostgreSQL Trigger for Overdue Tasks**
```sql
CREATE FUNCTION mark_overdue_tasks() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.due_date < NOW() AND NEW.status != 'Completed' THEN
        NEW.status := 'Overdue';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_overdue_status
BEFORE UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION mark_overdue_tasks();
```

---

## 🔗 API Endpoints

| Method | Endpoint            | Description |
|--------|---------------------|-------------|
| **POST** | `/tasks` | Create a task |
| **GET**  | `/tasks` | Fetch all tasks (supports filters) |
| **PATCH** | `/tasks/:id/status` | Update task status |
| **GET**  | `/tasks/:id` | Fetch a task by ID |

---

##  **Short Write-up**
### **API & Database Design**
The backend follows **RESTful principles** using **Express.js** and **Sequelize ORM** for PostgreSQL. The **tasks table** has constraints:
- `title` is **unique**.
- `due_date` **cannot be in the past**.
- `status` and `priority` are **ENUMs** to ensure valid values.

A **PostgreSQL trigger** auto-updates overdue tasks.

### **Challenges & Solutions**
1️⃣ **Table Not Found Error (`relation 'Tasks' does not exist`)**  
✅ Fixed by explicitly setting `tableName: 'tasks'` in Sequelize.  

2️⃣ **Database Connection Issues**  
✅ Used `.env` for credentials and verified PostgreSQL service using `pg_isready`.  

3️⃣ **API Request Validation**  
✅ Middleware rejects invalid requests (e.g., title containing `"test"`).  

### **Frontend UI Approach**
Built with **React + Local State** for simplicity. Features include:
- **Filters for High Priority & Due Soon tasks**.
- **Dynamic Status Dropdown**.
- **Minimalistic & Responsive UI**.

### **Final Thoughts**
By structuring the API efficiently, ensuring proper database constraints, and building a user-friendly frontend, this system meets all functional requirements.

---

## 📌 **Submission Checklist**
✅ **GitHub Repo** with backend, frontend, and API Gateway code.  
✅ **README with setup instructions** (this file).  
✅ **PostgreSQL schema script** (`tasks.sql`).  
✅ **Short Write-up (Above section)**.  

---

## 🛠️ **Contributing**
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Added new feature"`).
4. Push to your branch (`git push origin feature-name`).
5. Open a **Pull Request**.

---

## 📧 Contact
For any queries, feel free to contact **piyushprasad912@gmail.com**.

---

