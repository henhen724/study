import { supabase } from "../src/supabaseClient.js";
import { getSession } from "../src/auth.js";

const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");
const signinBtn = document.getElementById("signin-btn");
const signupBtn = document.getElementById("signup-btn");

let mode = "signin";

(async () => {
  if (await getSession()) {
    location.href = "../index.html";
  }
})();

function setMessage(text, kind) {
  message.textContent = text;
  message.className = `form-message ${kind || ""}`;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  setMessage("", "");
  signinBtn.disabled = true;
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  try {
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      location.href = "../index.html";
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: new URL("../index.html", location.href).href },
      });
      if (error) throw error;
      setMessage(
        "Account created. Check your email to confirm it, then sign in.",
        "success"
      );
      mode = "signin";
      signinBtn.textContent = "Sign in";
      signupBtn.textContent = "New here? Create an account instead";
    }
  } catch (err) {
    setMessage(err.message, "error");
  } finally {
    signinBtn.disabled = false;
  }
});

signupBtn.addEventListener("click", () => {
  mode = mode === "signin" ? "signup" : "signin";
  signinBtn.textContent = mode === "signin" ? "Sign in" : "Create account";
  signupBtn.textContent =
    mode === "signin"
      ? "New here? Create an account instead"
      : "Already have an account? Sign in instead";
  setMessage("", "");
});
