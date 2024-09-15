import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qagsgvvihmyzntlrfkwe.supabase.co";
//https://qagsgvvihmyzntlrfkwe.supabase.co
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhZ3NndnZpaG15em50bHJma3dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NDYzMTMsImV4cCI6MjAyNTQyMjMxM30.ekUmxoJBkk2eYdEwHfKLjZo15IjOzulVq5VmgvYAiFY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
