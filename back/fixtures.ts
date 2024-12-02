import mongoose from "mongoose";
import {User} from "./models/User";
import {Task} from "./models/Task";

const run = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/todo");
  const db = mongoose.connection;

  try {
    await db.dropCollection("users");
    await db.dropCollection("tasks");
  } catch (error) {
    console.log("Collection were not present, skipping drop...");
  }

  const firstUser = new User({
    username: "Bob",
    email: "wer@gmail.com",
    password: "123",
  });

  const secondUser = new User({
    username: "John",
    email: "rt@gmail.com",
    password: "123",
  });

  firstUser.generateToken();
  secondUser.generateToken();

  await firstUser.save();
  await secondUser.save();

  const [firstTask, secondTask, thirdTask, fourth, fifth] = await Task.create(
      {
        user: firstUser._id,
        title: "Complete JavaScript Tutorial",
        status: "in progress",
        priority: "extreme",
        date: "26/12/2024",
        description: "Finish all remaining sections of the JavaScript tutorial, including topics such as advanced array methods, async/await, closures, and DOM manipulation. Ensure to practice the exercises and build a mini-project to solidify the concepts learned."
      },
      {
        user: firstUser._id,
        title: "Grocery Shopping",
        status: "in progress",
        priority: "moderate",
        date: "26/10/2024",
        description: "Buy essential groceries for the week, including milk, bread, eggs, vegetables, fruits, and snacks. Don't forget to check for any ongoing discounts on items like cereals and beverages. Make sure to bring reusable bags to avoid plastic waste."
      },
      {
        user: firstUser._id,
        title: "Call with Client",
        status: "completed",
        priority: "low",
        date: "26/10/2024",
        description: "Discussed the project scope, timelines, and deliverables during a 30-minute call with the client. Confirmed their expectations and agreed on the next steps. Shared follow-up notes with the internal team for review."
      },
      {
        user: firstUser._id,
        title: "Prepare Presentation for Meeting",
        status: "not started",
        priority: "extreme",
        date: "28/12/2024",
        description: "Create a detailed slide deck covering the project progress, key performance indicators (KPIs), challenges encountered, and solutions proposed. Ensure the slides are visually appealing and concise. Practice the presentation for better delivery during the meeting."
      },
      {
        user: firstUser._id,
        title: "Weekly Team Meeting",
        status: "completed",
        priority: "low",
        date: "24/12/2024",
        description: "Conducted the weekly team meeting to review progress on all active tasks. Addressed any blockers faced by team members and discussed potential solutions. Shared minutes of the meeting along with action items and deadlines."
      },
      {
        user: firstUser._id,
        title: "Schedule Doctor's Appointment",
        status: "in progress",
        priority: "moderate",
        date: "30/12/2024",
        description: "Call the clinic and book an appointment for a routine health check-up. Make sure to check the availability of the preferred doctor and schedule it"
      }
  );

  await db.close();
};

run().catch(console.error);
