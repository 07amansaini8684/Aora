import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import images from "../../constants/images";
import FormField from "../../components/FormField";
import CustomButton from "../../components/buttonCompo";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmiting, setIsSubmiting] = useState(false);
  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill all fields");
    }
    setIsSubmiting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      // console.log(result);
      setIsSubmiting(false);
      // set it to global state....
      router.replace("/home")
    } catch (error) {
      Alert.alert("Error", error.message);
      setIsSubmiting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[80vh] justify-center my-6 px-4">
          <Image
            source={images.logo}
            className="w-[114px] h-[34px]"
            resizeMode="contain"
          />
          <Text className="text-white text-2xl text-semibold mt-10 font-psemibold">
            Sign up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChange={(text) => setForm({ ...form, username: text })}
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChange={(text) => setForm({ ...form, email: text })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChange={(text) => setForm({ ...form, password: text })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign Up"
            containerStyles="mt-7"
            handlePress={submit}
            isLoading={isSubmiting}
          />
          <View className=" justify-center pt-7 flex-row gap-2">
            <Text className="text-white text-base font-pregular">
              Already have an account?
            </Text>
            <Link
              className="text-secondary text-base font-psemibold"
              href="/sign-in"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

// com.Dev.Aora
