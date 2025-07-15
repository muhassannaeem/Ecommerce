import { StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "./screens/Home"
import SignUp from "./screens/SignUp"
import SignIn from "./screens/SignIn"
import Dashboard from "./screens/Dashboard"
import AdminLogin from "./screens/AdminLogin"
import AdminDashboard from "./screens/AdminDashboard"
import AddInventory from "./screens/AddInventory"
import ManageItems from "./screens/ManageItems"
import EditItem from "./screens/EditItem"
import ProductDetails from "./screens/ProductDetails"
import { ContextProvider } from "./context"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="AdminLogin" component={AdminLogin} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          <Stack.Screen name="AddInventory" component={AddInventory} />
          <Stack.Screen name="ManageItems" component={ManageItems} />
          <Stack.Screen name="EditItem" component={EditItem} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
