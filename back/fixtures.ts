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
        "user": firstUser._id,
        "title": "Complete JavaScript Tutorial",
        "status": "completed",
        "priority": "extreme",
        "date": "26/12/2024",
        "description": "Finish all remaining sections of the JavaScript tutorial, including topics such as advanced array methods, async/await, closures, and DOM manipulation. Ensure to practice the exercises and build a mini-project to solidify the concepts learned. Dive deeper into asynchronous programming, learn about promises and error handling, and explore how to manipulate the DOM dynamically using JavaScript. Additionally, experiment with integrating JavaScript frameworks like React or Vue.js to apply the learned concepts in a real-world environment."
      },
      {
        "user": firstUser._id,
        "title": "Grocery Shopping",
        "status": "in progress",
        "priority": "moderate",
        "date": "26/10/2024",
        "description": "Buy essential groceries for the week, including milk, bread, eggs, vegetables, fruits, and snacks. Don't forget to check for any ongoing discounts on items like cereals and beverages. Make sure to bring reusable bags to avoid plastic waste. Also, plan meals for the week and create a shopping list based on the recipes to avoid impulse buys. Take into account the dietary preferences and restrictions of family members, ensuring a balance of nutritious options while staying within budget."
      },
      {
        "user": firstUser._id,
        "title": "Create a Personal Budget Plan",
        "status": "not started",
        "priority": "extreme",
        "date": "15/01/2025",
        "description": "Create a comprehensive personal budget plan that tracks your monthly income, expenses, and savings goals. Categorize spending into fixed expenses (rent, utilities) and variable expenses (food, entertainment), and identify areas where you can reduce costs. Set realistic savings goals for the short-term and long-term, such as building an emergency fund or saving for a vacation. Use budgeting tools or spreadsheets to track progress and review monthly to make adjustments based on actual spending patterns. Focus on improving financial literacy by learning about investing and tax-saving strategies."
      },
      {
        "user": firstUser._id,
        "title": "Organize Digital Files",
        "status": "in progress",
        "priority": "moderate",
        "date": "05/01/2025",
        "description": "Sort and organize all digital files on your computer and cloud storage. Create a well-structured folder system for documents, photos, videos, and work-related files. Move old files into archival storage to free up space on your active working drives. Use naming conventions to make future searches easier and ensure that important files are backed up. Consider setting up automated cloud syncs to keep documents safe and accessible across devices. Review files for any outdated or unnecessary content, and delete those that no longer serve a purpose."
      },
      {
        "user": firstUser._id,
        "title": "Prepare for Job Interview",
        "status": "not started",
        "priority": "extreme",
        "date": "05/01/2025",
        "description": "Prepare thoroughly for the upcoming job interview by researching the company, its products/services, and recent news. Study the job description to understand the required skills and responsibilities, and align your experience accordingly. Prepare answers for common interview questions, focusing on your strengths, weaknesses, achievements, and problem-solving abilities. Practice with mock interviews to build confidence and improve your delivery. Additionally, review your portfolio or any past work samples that might be relevant. Plan your attire, ensuring it aligns with the company's dress code, and prepare a list of insightful questions to ask the interviewer."
      },
      {
        "user": firstUser._id,
        "title": "Start a Blog on Web Development",
        "status": "not started",
        "priority": "moderate",
        "date": "20/01/2025",
        "description": "Launch a blog focused on web development topics, including tutorials, best practices, and tips for beginners. Plan the content strategy by selecting key themes such as HTML, CSS, JavaScript, frameworks, and responsive design. Set up a blog on a platform like WordPress or Medium, customize the design, and ensure it's optimized for SEO. Write the first few posts, sharing personal experiences, insights, and solutions to common challenges faced by web developers. Consistently publish content and engage with readers by responding to comments and questions."
      },
      {
        "user": firstUser._id,
        "title": "Deep Clean the House",
        "status": "not started",
        "priority": "extreme",
        "date": "30/12/2024",
        "description": "Perform a thorough cleaning of the house, including scrubbing floors, washing windows, dusting furniture, and sanitizing bathrooms and kitchens. Focus on areas that are often overlooked in regular cleaning, such as baseboards, vents, and behind furniture. Organize and declutter each room to make it more functional and aesthetically pleasing. Consider donating unused items or selling things you no longer need. Use eco-friendly cleaning products wherever possible to reduce your environmental impact. After cleaning, implement a routine to maintain cleanliness regularly."
      },
      {
        "user": firstUser._id,
        "title": "Launch a Fitness Routine",
        "status": "in progress",
        "priority": "extreme",
        "date": "10/12/2024",
        "description": "Start a structured fitness routine with a balanced mix of strength training, cardio, and flexibility exercises. Create a weekly schedule that includes at least 3 days of strength training, 2 days of cardio, and daily stretching or yoga. Track progress by setting specific fitness goals, such as increasing weights lifted, running longer distances, or improving flexibility. Consider consulting a personal trainer or using a fitness app to guide your workouts and ensure proper form. Focus on nutrition and recovery by eating a balanced diet and prioritizing sleep."
      },
      {
        "user": firstUser._id,
        "title": "Plan a Weekend Getaway",
        "status": "not started",
        "priority": "low",
        "date": "10/02/2025",
        "description": "Plan a relaxing weekend getaway to recharge and escape the daily routine. Choose a destination that offers nature, outdoor activities, or cultural experiences. Research accommodation options, local restaurants, and must-see attractions. Pack efficiently, ensuring you bring necessary items like clothing for the weather, toiletries, and any personal items needed for outdoor activities. Set aside time to unwind, whether it's hiking, exploring a nearby town, or simply enjoying some quiet time in nature. Create an itinerary that balances relaxation and exploration, and book reservations in advance."
      },
      {
        "user": firstUser._id,
        "title": "Read 'Atomic Habits' by James Clear",
        "status": "completed",
        "priority": "low",
        "date": "01/01/2025",
        "description": "Read the book 'Atomic Habits' by James Clear and focus on implementing strategies to build good habits and break bad ones. Take notes on key concepts like the power of small changes, habit stacking, and the importance of environment design. Reflect on your current habits and identify areas where you can improve. Use Clear’s framework to set clear and actionable goals for habit formation, such as developing a morning routine or increasing physical activity. Track your progress and make adjustments along the way to ensure sustainable long-term growth."
      }
  );

  await db.close();
};

run().catch(console.error);
