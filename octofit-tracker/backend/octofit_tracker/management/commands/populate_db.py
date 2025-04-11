from django.core.management.base import BaseCommand
from pymongo import MongoClient
from bson import ObjectId
from datetime import timedelta
from django.conf import settings

class Command(BaseCommand):
    help = 'Populate the database with test data for users, teams, activities, leaderboard, and workouts'

    def handle(self, *args, **kwargs):
        client = MongoClient(settings.MONGO_HOST, settings.MONGO_PORT)
        db = client[settings.MONGO_DB_NAME]

        # Clear existing data
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activity.delete_many({})
        db.activities.delete_many({})  # Try both collection names
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})

        # Create users
        users = [
            {"_id": ObjectId(), "username": "thundergod", "email": "thundergod@mhigh.edu", "password": "password1"},
            {"_id": ObjectId(), "username": "metalgeek", "email": "metalgeek@mhigh.edu", "password": "password2"},
            {"_id": ObjectId(), "username": "zerocool", "email": "zerocool@mhigh.edu", "password": "password3"},
            {"_id": ObjectId(), "username": "crashoverride", "email": "crashoverride@mhigh.edu", "password": "password4"},
            {"_id": ObjectId(), "username": "sleeptoken", "email": "sleeptoken@mhigh.edu", "password": "password5"},
        ]
        db.users.insert_many(users)
        self.stdout.write("Users created!")

        # Create teams
        teams = [
            {"_id": ObjectId(), "name": "Blue Team", "members": [users[0]["_id"], users[1]["_id"]]},
            {"_id": ObjectId(), "name": "Gold Team", "members": [users[2]["_id"], users[3]["_id"], users[4]["_id"]]},
        ]
        db.teams.insert_many(teams)
        self.stdout.write("Teams created!")

        # Create activities
        activities = [
            {"_id": ObjectId(), "activity_id": "cycling-001", "user": users[0]["_id"], "activity_type": "Cycling", "duration": timedelta(hours=1).total_seconds()},
            {"_id": ObjectId(), "activity_id": "crossfit-001", "user": users[1]["_id"], "activity_type": "Crossfit", "duration": timedelta(hours=2).total_seconds()},
            {"_id": ObjectId(), "activity_id": "running-001", "user": users[2]["_id"], "activity_type": "Running", "duration": timedelta(hours=1, minutes=30).total_seconds()},
            {"_id": ObjectId(), "activity_id": "strength-001", "user": users[3]["_id"], "activity_type": "Strength", "duration": timedelta(minutes=30).total_seconds()},
            {"_id": ObjectId(), "activity_id": "swimming-001", "user": users[4]["_id"], "activity_type": "Swimming", "duration": timedelta(hours=1, minutes=15).total_seconds()},
        ]
        
        # Try both collection names to ensure one works
        try:
            db.activities.insert_many(activities)
            self.stdout.write("Activities created in 'activities' collection!")
        except Exception as e:
            self.stdout.write(f"Error inserting into 'activities': {str(e)}")
            try:
                db.activity.insert_many(activities)
                self.stdout.write("Activities created in 'activity' collection!")
            except Exception as e:
                self.stdout.write(f"Error inserting into 'activity': {str(e)}")

        # Create leaderboard entries
        leaderboard_entries = [
            {"_id": ObjectId(), "leaderboard_id": "leader-001", "user": users[0]["_id"], "score": 100},
            {"_id": ObjectId(), "leaderboard_id": "leader-002", "user": users[1]["_id"], "score": 90},
            {"_id": ObjectId(), "leaderboard_id": "leader-003", "user": users[2]["_id"], "score": 95},
            {"_id": ObjectId(), "leaderboard_id": "leader-004", "user": users[3]["_id"], "score": 85},
            {"_id": ObjectId(), "leaderboard_id": "leader-005", "user": users[4]["_id"], "score": 80},
        ]
        db.leaderboard.insert_many(leaderboard_entries)
        self.stdout.write("Leaderboard entries created!")

        # Create workouts
        workouts = [
            {"_id": ObjectId(), "workout_id": "workout-001", "name": "Cycling Training", "description": "Training for a road cycling event"},
            {"_id": ObjectId(), "workout_id": "workout-002", "name": "Crossfit", "description": "Training for a crossfit competition"},
            {"_id": ObjectId(), "workout_id": "workout-003", "name": "Running Training", "description": "Training for a marathon"},
            {"_id": ObjectId(), "workout_id": "workout-004", "name": "Strength Training", "description": "Training for strength"},
            {"_id": ObjectId(), "workout_id": "workout-005", "name": "Swimming Training", "description": "Training for a swimming competition"},
        ]
        db.workouts.insert_many(workouts)
        self.stdout.write("Workouts created!")

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data.'))