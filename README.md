# Personalized Travel Itinerary Planner Agent

This project is an AI agent built using the Upstreet SDK that creates personalized travel itineraries based on the user's interests, budget, time constraints, and desired destination. The agent engages in interactive conversations to gather necessary information and provides a detailed itinerary tailored to the user's preferences.

## Table of Contents
- [Features](#features)
- [Idea Selected](#idea-selected)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [How to Run the Agent](#how-to-run-the-agent)

## Features

- **Personalized Itineraries**: Generates custom travel plans based on user-provided interests, budget, time constraints, and destination.
- **Interactive Conversation**: Engages users in a friendly dialogue to collect necessary travel information.
- **Dynamic Joke Generation**: Uses the agent's Natural Language Understanding (NLU) capabilities to generate jokes when budget or time constraints are limiting.
- **State Management**: Maintains conversation context using React's `useState` hook to store user inputs.
- **No External APIs**: Relies solely on built-in capabilities without integrating external APIs or tools.

## Idea Selected
Create an AI Agent using Upstreet to develop personalized travel itineraries based on interests, budget, and time constraints.

## Technologies Used

- **Upstreet SDK**: For building the AI agent and handling user interactions.
- **React**: Utilized for state management with hooks like `useState`.
- **Zod**: Used for schema validation in action handlers.
- **JavaScript/TypeScript**: Programming languages used for development.

## Project Structure

- **`agent.tsx`**: The main agent file containing the conversation logic and action handlers.
- **`package.json`**: Contains project dependencies and scripts.
- **`README.md`**: Project documentation (this file).

## How to Run the Agent

### Clone the Repository:
```bash
git clone https://github.com/yourusername/your-repo-name.git
```
run usdk chat, in the agent directory.
