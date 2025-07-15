import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { db } from "../firebase"
import { doc, updateDoc } from "firebase/firestore"

export default function EditItem({ route, navigation }) {
  const { item } = route.params

  const [itemName, setItemName] = useState(item.name)
  const [description, setDescription] = useState(item.description)
  const [quantity, setQuantity] = useState(item.quantity.toString())
  const [price, setPrice] = useState(item.price.toString())
  const [category, setCategory] = useState(item.category)
  const [subcategory, setSubcategory] = useState(item.subcategory)

  const categories = ["men", "women", "children"]
  const subcategories = ["shirts", "pants", "trousers", "dresses", "shoes", "accessories"]

  const handleUpdateItem = async () => {
    console.log("Update button pressed");
    
    if (!itemName || !description || !quantity || !price) {
      Alert.alert("Error", "Please fill all fields")
      return
    }

    try {
      console.log("Updating document:", item.id);
      console.log("New data:", {
        name: itemName,
        description: description,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        category: category,
        subcategory: subcategory,
      });
      
      await updateDoc(doc(db, "inventory", item.id), {
        name: itemName,
        description: description,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        category: category,
        subcategory: subcategory,
        updatedAt: new Date(),
      })

      console.log("Document updated successfully");
      Alert.alert("Success", "Item updated successfully!")
      navigation.goBack()
    } catch (error) {
      console.error("Error updating document:", error);
      Alert.alert("Error", "Failed to update item: " + error.message)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Edit Item</Text>

      <Text style={styles.label}>Item Name</Text>
      <TextInput style={styles.input} placeholder="Enter item name" value={itemName} onChangeText={setItemName} />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter item description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
          {categories.map((cat) => (
            <Picker.Item key={cat} label={cat.charAt(0).toUpperCase() + cat.slice(1)} value={cat} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Subcategory</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={subcategory} onValueChange={setSubcategory} style={styles.picker}>
          {subcategories.map((subcat) => (
            <Picker.Item key={subcat} label={subcat.charAt(0).toUpperCase() + subcat.slice(1)} value={subcat} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdateItem}>
        <Text style={styles.buttonText}>Update Item</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 15,
  },
  pickerContainer: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  backButton: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})