import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"

export default function ProductDetails({ route, navigation }) {
  const { item } = route.params

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Category</Text>
        <Text style={styles.sectionContent}>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subcategory</Text>
        <Text style={styles.sectionContent}>
          {item.subcategory.charAt(0).toUpperCase() + item.subcategory.slice(1)}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Stock</Text>
        <Text style={styles.stock}>{item.quantity} units available</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  productName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: "#666",
    textTransform: "capitalize",
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  stock: {
    fontSize: 16,
    color: (item) => (item.quantity > 0 ? "#4CAF50" : "#F44336"),
    fontWeight: "600",
  },
  buttonContainer: {
    marginTop: 30,
    gap: 15,
  },
  addToCartButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})
