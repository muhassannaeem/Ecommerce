import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

export default function AdminDashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Admin Dashboard</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.addButton]} 
          onPress={() => navigation.navigate("AddInventory")}
        >
          <Text style={styles.buttonText}>Add Inventory</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.manageButton]}
          onPress={() => navigation.navigate("ManageItems")}
        >
          <Text style={styles.buttonText}>Manage Items</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.logoutButton]} 
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
    textAlign: "center",
  },
  buttonContainer: {
    gap: 20,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButton: {
    backgroundColor: "#4CAF50",
  },
  manageButton: {
    backgroundColor: "#2196F3",
  },
  logoutButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})