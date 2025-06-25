import supabase from '../db/supabase.js';

//login function
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

//get current user session (login / logout)
export async function getCurrentUser() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) throw new Error(error.message);
  if (!session) return null;

  return session.user;
}

//signup function
export async function signup({ name, email, password, profilepic }) {
  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;
  
  const { error: storageError } = await supabase.storage
    .from("profilepic")
    .upload(fileName, profilepic);

  if (storageError) throw new Error(storageError.message);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profilepic: `${supabaseUrl}/storage/v1/object/public/profilepic/${fileName}`,
      },
    },
  });
  

  if (error) throw new Error(error.message);
  return data;
}

//logout function
export async function logout() {
  const {error} = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}