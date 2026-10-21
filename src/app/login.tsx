import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthInput } from "@/components/auth/auth-input";
import { AuthScreen } from "@/components/auth/auth-screen";
import { PrimaryButton } from "@/components/auth/primary-button";
import { SocialLogin } from "@/components/auth/social-login";
import { Colors, Fonts } from "@/constants/theme";
import { supabase } from "@/lib/supabase";

export default function LoginScreen() {
  const passwordRef = useRef<TextInput>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/home");
    });
  }, []);

  const handleLogin = async () => {
    Keyboard.dismiss();

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setErrorMessage("Enter your email and password.");
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    });

    if (error || !data.session) {
      setErrorMessage("Email or password is incorrect.");
      setSubmitting(false);
      return;
    }

    const { data: account, error: accountError } = await supabase
      .from("accounts")
      .select("id")
      .eq("id", data.session.user.id)
      .maybeSingle();

    if (accountError || !account) {
      await supabase.auth.signOut();
      setErrorMessage("Email or password is incorrect.");
      setSubmitting(false);
      return;
    }

    router.replace("/home");
  };

  return (
    <AuthScreen
      header={
        <View style={styles.header}>
          <Text style={styles.hello}>Hello!</Text>
          <Text style={styles.welcome}>Welcome to Coco</Text>
        </View>
      }
    >
      <Text style={styles.title}>Login</Text>

      <AuthInput
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
        autoComplete="current-password"
        textContentType="password"
        returnKeyType="go"
        onSubmitEditing={handleLogin}
      />

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <Pressable style={styles.forgot} hitSlop={8}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </Pressable>

      <PrimaryButton title="Login" onPress={handleLogin} disabled={submitting} />

      <SocialLogin label="Or login with" />

      <AuthFooter
        prompt="Don't have an account?"
        linkText="Sign Up"
        href="/sign-up"
      />
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 28,
    paddingTop: 64,
    paddingBottom: 48,
  },
  hello: {
    fontFamily: Fonts.display,
    fontSize: 56,
    color: Colors.white,
  },
  welcome: {
    fontFamily: Fonts.body,
    fontSize: 24,
    color: Colors.white,
    marginTop: -4,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 40,
    color: Colors.plum,
    marginBottom: 20,
  },
  forgot: {
    alignSelf: "flex-end",
    marginTop: 12,
    marginRight: 6,
  },
  forgotText: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.plum,
  },
  error: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: "#8C3A3A",
    marginTop: 12,
    marginLeft: 6,
  },
});
