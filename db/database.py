import firebase_admin
from firebase_admin import credentials, db
import bcrypt
import os

class Database:
    def __init__(self):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        cred_path = os.path.join(base_dir, "../config/firebaseKey.json")

        if not firebase_admin._apps:
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred,
            {
                "databaseURL": "https://naucse-a8142-default-rtdb.europe-west1.firebasedatabase.app"
            })
        self.user_ref = db.reference("users")

    def loginUser(self, name, password):
        try:
            res = self.user_ref.order_by_child("username").equal_to(name).get()
            if res:
                for user_id, user_data in res.items():
                    hash_pass = user_data.get("password")
                    if bcrypt.checkpw(password.encode(), hash_pass.encode()):
                        return True
                    else:
                        print("Incorrect password")
                        return False
            else:
                print("User not found")
                return False
        except Exception as e:
            print(f"Error: {e}")
            return False
