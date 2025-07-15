import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to myApp</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.signInButton]} onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.adminButton]}
          onPress={() => navigation.navigate("AdminLogin")}
        >
          <Text style={styles.buttonText}>Admin</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  title: {
    fontSize: 28,
    marginBottom: 40,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
  },
  buttonsContainer: {
    width: "100%",
    maxWidth: 300,
    gap: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signUpButton: {
    backgroundColor: "#4CAF50",
  },
  signInButton: {
    backgroundColor: "#2196F3",
  },
  adminButton: {
    backgroundColor: "#FF6B35",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
})