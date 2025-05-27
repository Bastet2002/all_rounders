import { db } from './firebase';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';

// Function to migrate team data to Firebase
const migrateTeamData = async () => {
  try {
    console.log('Starting migration of team data to Firebase...');
    
    // Import the JSON file directly
    const teamDataFile = require('../data/teamData.json');
    
    // Extract the team array from the JSON structure
    const teamData = teamDataFile.team;
    
    console.log('Team data structure:', teamDataFile);
    console.log('Team array extracted:', teamData);
    console.log('Team array length:', teamData ? teamData.length : 0);
    
    // Make sure we have valid data
    if (!teamData || !Array.isArray(teamData) || teamData.length === 0) {
      console.error('Invalid team data format or empty array');
      return { success: false, message: 'Team data is empty or not properly structured' };
    }
    
    // Check if data already exists
    const teamCollection = collection(db, 'team-members');
    const querySnapshot = await getDocs(query(teamCollection));
    if (!querySnapshot.empty) {
      console.log('Team data already exists in Firebase. Skipping migration to prevent duplicates.');
      return { success: false, message: 'Data already exists' };
    }
    
    // Counter for successful migrations
    let successCount = 0;
    
    // Loop through each team member in the JSON file
    for (const member of teamData) {
      console.log(`Attempting to migrate team member: ${member.name}`);
      
      try {
        // Add the member to Firestore
        await addDoc(teamCollection, {
          id: member.id,
          name: member.name,
          translatedName: member.translatedName,
          role: member.role,
          funnyRole: member.funnyRole,
          roleIcon: member.roleIcon,
          image: member.image,
          bio: member.bio,
          linkedin: member.linkedin || null,
          academic: member.academic || [],
          keywords: member.keywords || [],
          allroundersToYou: member.allroundersToYou || null,
          likes: member.likes || [],
          icons: member.icons || {},
          isPreRounder: member.isPreRounder || false,
          createdAt: new Date(),
          order: member.order || successCount + 1
        });
        
        successCount++;
        console.log(`Successfully migrated team member: ${member.name}`);
      } catch (memberError) {
        console.error(`Error migrating team member ${member.name}:`, memberError);
      }
    }
    
    console.log(`Migration complete! ${successCount} team members migrated.`);
    return { success: true, count: successCount };
  } catch (error) {
    console.error('Error migrating team data:', error);
    return { success: false, error: error.message };
  }
};

export default migrateTeamData;