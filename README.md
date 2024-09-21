# MedCall
Capstone Project Phase B – 61999
MedCall 24-1-D-10
Supervisor: Mr. Alex Keselman
Team: Tareez Ghandour & Leen Hawa

## Project Phases and Deliverables

### Phase A:
In the **Phase A** folder, we have included all the products related to the initial planning and design of the project. The products are:
- **The book**: Detailed documentation covering the project’s background, objectives, and research.
- **Presentation (PPT)**: A PowerPoint presentation summarizing the project idea and design.

### Phase B:
In the **Phase B** folder, we have the implementation phase, which includes the code and additional deliverables. The products are:
- **The book**: Updated documentation reflecting the development and outcomes of the project.
- **Presentation (PPT)**: A PowerPoint presentation summarizing the project progress and results.
- **A demo for MedCall**: A video demonstrating the main scenario of MedCall in action.
- **Code Implementation**: The actual code for the frontend and backend, showcasing the working platform.

---

## Maintenance Guide (User Help)

### Initial Setup:
To get started with the MedCall system, follow these steps:
1. **Download the Project:**
   - **Clone the Repository** by running the command:
     ```bash
     git clone https://github.com/tareezgh/MedCall
     ```
     This will include both the frontend and backend projects.
   - **Download ZIP**: Alternatively, you can download the ZIP file from the repository and extract it.

2. **Open the projects in Visual Studio Code (VSCode):**
   - Open the `medcall-client` project and the `medcall-server` project in separate VSCode windows.

3. **Install Dependencies:**
   - Open the terminal in each project and run the following command to download any missing packages:
     ```bash
     npm install
     ```
     This will allow you to work on each project independently.

4. **Run the Application:**
   - **Start the Backend Server:** In the backend terminal, run:
     ```bash
     npx ts-node src/app.ts
     ```
   - **Start the Frontend Client:** In the frontend terminal, run:
     ```bash
     npm run dev
     ```

5. **Access the Platform:**
   - Open Google Chrome and navigate to the provided link (e.g., `http://localhost:5173/`) to use the platform.

By following these steps, you can set up both the frontend and backend projects of the MedCall platform.

---

### Libraries and Tools:

#### Frontend (`medcall-client`):
- **Preact**: Lightweight alternative to React.
- **Vite**: Build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework.
- **Leaflet**: Library for interactive maps.
- **Redux Toolkit**: For state management.
- **Firebase**: For authentication and real-time data.
- **i18next**: For internationalization (supports English, Arabic, Hebrew, and Russian).
- **Axios**: For HTTP requests.
- **React-Leaflet**: Integration of Leaflet with Preact.
- **React-Toastify**: For notifications.

#### Backend (`medcall-server`):
- **Express**: Web framework for Node.js.
- **MongoDB and Mongoose**: For database management.
- **JWT**: For authentication.
- **Nodemailer**: For email sending.
- **WebSocket (ws)**: For real-time communication.
- **bcrypt**: For password hashing.
- **dotenv**: For environment variable management.
- **Jest**: For testing.

---

### Deployment:
- The frontend is deployed to **Firebase**.
- The backend (WebSocket support) is deployed to **Heroku**.

---
