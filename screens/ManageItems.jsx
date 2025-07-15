import { useState, useEffect } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native"
import { db } from "../firebase"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"

export default function ManageItems({ navigation }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch items when screen loads or returns to focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchItems();
    });
    
    return unsubscribe;
  }, [navigation]);

  const fetchItems = async () => {
    console.log("Fetching items from Firestore...");
    setLoading(true);
    
    try {
      const querySnapshot = await getDocs(collection(db, "inventory"))
      const itemsList = []
      querySnapshot.forEach((doc) => {
        console.log("Document found:", doc.id);
        itemsList.push({ id: doc.id, ...doc.data() })
      })
      console.log(`Found ${itemsList.length} items`);
      setItems(itemsList)
    } catch (error) {
      console.error("Error fetching items:", error);
      Alert.alert("Error", "Failed to fetch items: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  // Simple delete function without confirmation dialog first
  const handleDeleteDirect = async (itemId, itemName) => {
    console.log("Direct delete requested for item:", itemId, itemName);
    
    try {
      console.log("Attempting to delete document...");
      await deleteDoc(doc(db, "inventory", itemId))
      console.log("Document deleted successfully from Firebase");
      
      // Update the local state to remove the item
      const updatedItems = items.filter((item) => item.id !== itemId)
      console.log("Updating local state, new count:", updatedItems.length);
      setItems(updatedItems)
      
      Alert.alert("Success", `${itemName} deleted successfully!`)
    } catch (error) {
      console.error("Error deleting document:", error);
      Alert.alert("Error", "Failed to delete item: " + error.message)
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDetails}>Category: {item.category}</Text>
      <Text style={styles.itemDetails}>Subcategory: {item.subcategory}</Text>
      <Text style={styles.itemDetails}>Quantity: {item.quantity}</Text>
      <Text style={styles.itemDetails}>Price: ${item.price}</Text>
      <Text style={styles.itemDetails}>ID: {item.id}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => {
            console.log("Edit button pressed for:", item.name);
            navigation.navigate("EditItem", { item });
          }}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>

        {/* Test button for direct delete */}
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]} 
          onPress={() => {
            console.log("Delete button pressed for:", item.name);
            handleDeleteDirect(item.id, item.name);
          }}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>

      </View>
    </View>
  )

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading items...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Manage Items ({items.length})</Text>

      {items.length === 0 ? (
        <Text style={styles.noItems}>No items found. Add some inventory first!</Text>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noItems: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 50,
    marginBottom: 50,
  },
  itemCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  itemDetails: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 5,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#2196F3",
  },
  deleteButton: {
    backgroundColor: "#F44336",
  },
  testButton: {
    backgroundColor: "#FF9800",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  backButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})