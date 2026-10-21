import { router } from "expo-router";
import { useRef, useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native";

import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthInput } from "@/components/auth/auth-input";
import { AuthScreen } from "@/components/auth/auth-screen";
import { PrimaryButton } from "@/components/auth/primary-button";
import { SocialLogin } from "@/components/auth/social-login";
import { Colors, Fonts } from "@/constants/theme";
import { supabase } from "@/lib/supabase";

export default function SignUpScreen() {
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSignUp = async () => {
    Keyboard.dismiss();

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setErrorMessage("Enter an email and password.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: {
        data: {
          username: username.trim(),
          phone: phone.trim(),
        },
      },
    });

    if (error || !data.user) {
      setErrorMessage(error?.message ?? "Could not create the account.");
      setSubmitting(false);
      return;
    }

    if (!data.session) {
      const signedIn = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (signedIn.error || !signedIn.data.session) {
        setErrorMessage(signedIn.error?.message ?? "Could not sign in after creating the account.");
        setSubmitting(false);
        return;
      }
    }

    router.replace("/home");
  };

  return (
    <AuthScreen
      header={
        <View style={styles.header}>
          <Text style={styles.welcome}>Welcome!</Text>
        </View>
      }
    >
      <AuthInput
        icon={{ ios: "person", android: "person", web: "person" }}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoComplete="username"
        textContentType="username"
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => emailRef.current?.focus()}
      />

      <AuthInput
        ref={emailRef}
        icon={{ ios: "envelope", android: "mail", web: "mail" }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoComplete="email"
        textContentType="emailAddress"
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />

      <AuthInput
        ref={passwordRef}
        icon={{ ios: "lock", android: "lock", web: "lock" }}
        secure
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => confirmPasswordRef.current?.focus()}
      />

      <AuthInput
        ref={confirmPasswordRef}
        icon={{ ios: "lock", android: "lock", web: "lock" }}
        secure
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => phoneRef.current?.focus()}
      />

      <AuthInput
        ref={phoneRef}
        icon={{ ios: "phone", android: "call", web: "call" }}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        autoComplete="tel"
        textContentType="telephoneNumber"
        returnKeyType="done"
        onSubmitEditing={handleSignUp}
      />

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <PrimaryButton title="Sign Up" onPress={handleSignUp} disabled={submitting} />

      <SocialLogin label="Or sign up with" />

      <AuthFooter
        prompt="Already have an account?"
        linkText="Sign In"
        href="/login"
        dismissTo
      />
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 40,
  },
  welcome: {
    fontFamily: Fonts.display,
    fontSize: 40,
    color: Colors.white,
  },
  error: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: "#8C3A3A",
    marginTop: 12,
    marginLeft: 6,
  },
});
