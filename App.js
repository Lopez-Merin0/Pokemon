import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarShowLabel: true,

        tabBarStyle: {
          backgroundColor: "#FFFDFD",

          borderTopWidth: 0,

          height: 75,

          paddingBottom: 10,

          paddingTop: 10,

          borderTopLeftRadius: 25,

          borderTopRightRadius: 25,

          position: "absolute",
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        tabBarActiveTintColor:
          "#F8BBD0",

        tabBarInactiveTintColor:
          "#B8AFAF",

        tabBarIcon: ({
          color,
          size,
        }) => {
          let iconName;

          if (
            route.name === "Home"
          ) {
            iconName =
              "home";
          } else {
            iconName =
              "heart";
          }

          return (
            <Ionicons
              name={iconName}
              size={22}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Favorites"
        component={
          FavoritesScreen
        }
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Tabs}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Detail"
            component={
              DetailScreen
            }
            options={{
              title: "Detail",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}