import { useContext, useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native"
import { MyContext } from "../context"
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore"

export default function Dashboard({ navigation }) {
  const { user } = useContext(MyContext)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "inventory"))
      const itemsList = []
      querySnapshot.forEach((doc) => {
        itemsList.push({ id: doc.id, ...doc.data() })
      })
      setItems(itemsList)
    } catch (error) {
      Alert.alert("Error", "Failed to fetch items")
    } finally {
      setLoading(false)
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemCard} onPress={() => navigation.navigate("ProductDetails", { item })}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemCategory}>
        {item.category} - {item.subcategory}
      </Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
      <Text style={styles.itemStock}>Stock: {item.quantity}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Ecommerce Store</Text>
        <Text style={styles.welcome}>Welcome, {user}! 👋</Text>
      </View>

      <Text style={styles.sectionTitle}>Available Products</Text>

      {loading ? (
        <Text style={styles.loadingText}>Loading products...</Text>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.homeButtonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F0FE",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  welcome: {
    fontSize: 20,
    color: "#444",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 50,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemCard: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  itemCategory: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    textTransform: "capitalize",
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 4,
  },
  itemStock: {
    fontSize: 12,
    color: "#666",
  },
  homeButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})
