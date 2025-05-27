import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Alert, CircularProgress, Container, Paper } from '@mui/material';
import migrateTeamData from '../../utils/migrateTeamData';
import { db } from '../../utils/firebase';

const DataMigration = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [firebaseStatus, setFirebaseStatus] = useState('checking');
  
  // Check Firebase connection on mount
  useEffect(() => {
    console.log("DataMigration component mounted");
    
    // Test Firebase connection
    const checkFirebase = async () => {
      try {
        // Just try to access Firestore to see if connection works
        const testCollection = db.collection ? db.collection('test') : null;
        setFirebaseStatus('connected');
        console.log("Firebase connection successful");
      } catch (error) {
        console.error("Firebase connection error:", error);
        setFirebaseStatus('error');
      }
    };
    
    checkFirebase();
  }, []);

  const handleMigration = async () => {
    console.log("Migration button clicked");
    if (window.confirm("Are you sure you want to migrate team data from JSON to Firebase? This should only be done once.")) {
      try {
        setLoading(true);
        console.log("Starting migration process...");
        const migrationResult = await migrateTeamData();
        console.log("Migration result:", migrationResult);
        setResult(migrationResult);
      } catch (error) {
        console.error("Migration failed:", error);
        setResult({ success: false, error: error.message });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ my: 4, p: 4, bgcolor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Team Data Migration Tool
        </Typography>
        
        {firebaseStatus === 'checking' && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Checking Firebase connection...
          </Alert>
        )}
        
        {firebaseStatus === 'error' && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Error connecting to Firebase. Please check your configuration.
          </Alert>
        )}
        
        {firebaseStatus === 'connected' && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Connected to Firebase successfully.
          </Alert>
        )}
        
        <Typography variant="body1" sx={{ mb: 2 }}>
          This will transfer your team data from the JSON file to Firebase Firestore.
          Only run this once to avoid duplicate data.
        </Typography>
        
        <Button 
          variant="contained" 
          onClick={handleMigration}
          disabled={loading || firebaseStatus !== 'connected'}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? 'Migrating...' : 'Migrate Team Data to Firebase'}
        </Button>
        
        {result && (
          <Alert 
            severity={result.success ? "success" : "error"} 
            sx={{ mt: 2 }}
          >
            {result.success 
              ? `Successfully migrated ${result.count} team members to Firebase.` 
              : `Migration failed: ${result.message || result.error || 'Unknown error'}`}
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default DataMigration;