import React, { useState } from 'react';
import { Agent, Prompt, Action } from 'react-agents'; // Adjust the import path if necessary
import { z } from 'zod';

const itinerarySchema = z.object({
  budget: z.number().optional(),
  destination: z.string().optional(),
  time: z.number().optional(),
  interests: z.array(z.string()).optional(),
});

const MyAgent = () => {
  const [itineraryData, setItineraryData] = useState<z.infer<typeof itinerarySchema>>({
    budget: undefined,
    destination: undefined,
    time: undefined,
    interests: [],
  });

  const generateItinerary = (data) => {
    const { interests, budget, time, destination } = data;
    const missingFields = [];
    // Check each field and add to the missingFields array if it's missing or invalid
    if (!interests || !interests.length) missingFields.push('interests');
    if (!budget) missingFields.push('budget');
    if (!time) missingFields.push('time');
    if (!destination) missingFields.push('destination');

    if (missingFields.length > 0) {
      return `Please provide your:  ${missingFields.join(', ')}`;
    }

    return `
Based on your interests in ${interests.join(', ')}, a budget of $${budget}, a travel duration of ${time} days, and your destination ${destination}, here's a suggested itinerary:

- **Day 1**: Arrival in ${destination} and exploration of local sights related to ${interests[0]}.
- **Day 2**: Activities focused on ${interests[1] || interests[0]}.
- **Day 3**: Enjoying ${interests[2] || interests[0]} with recommended restaurants.
- **Day 4-${time}**: Free time to explore other attractions within your budget.

Hope you enjoy your trip!
    `;
  };

  return (
    <Agent>
      <Prompt>
        You are a travel itinerary planner assistant. Your goal is to create personalized travel plans for users based on their interests, budget, time constraints, and destination. Engage in conversation to gather necessary information and provide detailed itineraries that include destinations, activities, accommodations, and transportation options.

        Be friendly, professional, and helpful. If you're unsure about specific details, ask the user for clarification. Do not use external APIs; rely on general knowledge to provide recommendations.

        This assistant is developed by MultiCortical Example Technologies. For support, refer users to our help pages at https://multicortical.example.com/
      </Prompt>

      {/* Actions to set itinerary data */}
      <Action
        name="setInterests"
        description="Set the user's travel interests"
        schema={z.object({
          interests: z.array(z.string()),
        })}
        examples={[
          { interests: ['beaches', 'hiking', 'local cuisine'] },
        ]}
        handler={async (e) => {
          const { interests } = e.data.message.args;
          setItineraryData((prevData) => ({
            ...prevData,
            interests,
          }));
          await e.data.agent.say(`Great! I'll note your interests: ${interests.join(', ')}.`);
          await e.commit();
        }}
      />

      <Action
        name="setBudget"
        description="Set the user's travel budget"
        schema={z.object({
          budget: z.number(),
        })}
        examples={[
          { budget: 1500 },
        ]}
        handler={async (e) => {
          const { budget } = e.data.message.args;
          setItineraryData((prevData) => ({
            ...prevData,
            budget,
          }));
          await e.data.agent.say(`Understood, your budget is $${budget}.`);
          await e.commit();
        }}
      />

      <Action
        name="setTimeConstraints"
        description="Set the user's travel time constraints in days"
        schema={z.object({
          time: z.number(),
        })}
        examples={[
          { time: 7 },
        ]}
        handler={async (e) => {
          const { time } = e.data.message.args;
          setItineraryData((prevData) => ({
            ...prevData,
            time,
          }));
          await e.data.agent.say(`Got it, your travel duration is ${time} days.`);
          await e.commit();
        }}
      />

      <Action
        name="setDestination"
        description="Set the user's travel destination"
        schema={z.object({
          destination: z.string(),
        })}
        examples={[
          { destination: 'Italy' },
        ]}
        handler={async (e) => {
          const { destination } = e.data.message.args;
          setItineraryData((prevData) => ({
            ...prevData,
            destination,
          }));
          await e.data.agent.say(`Noted, your desired destination is ${destination}.`);
          await e.commit();
        }}
      />

      {/* Action to generate itinerary */}
      <Action
        name="generateItinerary"
        description="Generate a personalized travel itinerary based on collected information"
        schema={z.object({})}
        handler={async (e) => {
          const itinerary = generateItinerary(itineraryData);
          await e.data.agent.say(itinerary);
          await e.commit();
        } } examples={[]}      />
    </Agent>
  );
};

export default MyAgent;
