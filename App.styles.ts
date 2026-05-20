export const tabNavigatorOptions = {
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
  tabBarActiveTintColor: "#F8BBD0",
  tabBarInactiveTintColor: "#B8AFAF",
};

export const getTabIcon = (route: any) => {
  let iconName;

  if (route.name === "Home") {
    iconName = "home";
  } else {
    iconName = "heart";
  }

  return iconName;
};
