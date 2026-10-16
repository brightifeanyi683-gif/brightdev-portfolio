
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const emptyForm = {
  title: "",
  description: "",
  project_url: "",
  technologies: "",
  published: true,
};

export default function Admin() {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      if (error) setMessage(error.message);
      setSession(data?.session ?? null);
      setCheckingSession(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession);
      }
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) loadProjects();
  }, [session]);

  async function loadProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      return;
    }

    setProjects(data ?? []);
  }

  async function handleLogin(event) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setMessage(error.message);
    setBusy(false);
  }

  function startEditing(project) {
  setEditingId(project.id);

  setForm({
    title: project.title ?? "",
    description: project.description ?? "",
    project_url: project.project_url ?? "",
    technologies: (project.technologies ?? []).join(", "),
    published: project.published,
  });

  setImage(null);
  setMessage(`Editing "${project.title}"`);
}

  async function handleSaveProject(event) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      let imageUrl = "";

if (editingId !== null) {
  const existingProject = projects.find(
    (project) => project.id === editingId
  );

  imageUrl = existingProject?.image_url ?? "";
}

      if (image) {
        const extension = image.name.split(".").pop()?.toLowerCase() || "jpg";
        const safeName = `${crypto.randomUUID()}.${extension}`;
        const path = `portfolio/${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(path, image, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("project-images")
          .getPublicUrl(path);

        imageUrl = data.publicUrl;
      }

      const technologies = form.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const projectData = {
  title: form.title.trim(),
  description: form.description.trim(),
  project_url: form.project_url.trim(),
  image_url: imageUrl,
  technologies,
  published: form.published,
};

let error;

if (editingId !== null) {
  const result = await supabase
    .from("projects")
    .update(projectData)
    .eq("id", editingId);

  error = result.error;
} else {
  const result = await supabase
    .from("projects")
    .insert(projectData);

  error = result.error;
}

if (error) throw error;

      const wasEditing = editingId !== null;

setForm(emptyForm);
setImage(null);
setEditingId(null);
event.target.reset();

setMessage(
  wasEditing
    ? "Project updated successfully!"
    : "Project added successfully!"
);

await loadProjects();
    } catch (error) {
      setMessage(error.message || "Could not save the project.");
    } finally {
      setBusy(false);
    }
  }

  async function togglePublished(project) {
    const { error } = await supabase
      .from("projects")
      .update({ published: !project.published })
      .eq("id", project.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Project status updated.");
    await loadProjects();
  }

  async function deleteProject(project) {
    const confirmed = window.confirm(
      `Delete "${project.title}"? This cannot be undone.`
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", project.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Project deleted.");
    await loadProjects();
  }

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) setMessage(error.message);
  }

  if (checkingSession) {
    return <main className="admin-login-page">Checking session...</main>;
  }

  if (!session) {
    return (
      <main className="admin-login-page">
        <form className="admin-login-card" onSubmit={handleLogin}>
          <h1>BrightDev Admin</h1>
          <p>Sign in to manage your portfolio projects.</p>

          <label htmlFor="admin-email">Email address</label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
            required
          />

          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />

          <button type="submit" disabled={busy}>
            {busy ? "Signing in..." : "Sign in"}
          </button>

          {message && <p role="alert">{message}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="admin-dashboard">
      <header className="admin-dashboard-header">
        <div>
          <h1>BrightDev Dashboard</h1>
          <p>Manage your portfolio projects.</p>
        </div>
        <button type="button" onClick={handleSignOut}>
          Sign out
        </button>
      </header>

      {message && <p className="admin-message" role="status">{message}</p>}

      <section className="admin-panel">
       <h2>{editingId !== null ? "Edit project" : "Add a project"}</h2>

        <form className="admin-project-form" onSubmit={handleSaveProject}>
          <label htmlFor="project-title">Project title</label>
          <input
            id="project-title"
            value={form.title}
            onChange={(event) =>
              setForm({ ...form, title: event.target.value })
            }
            required
          />

          <label htmlFor="project-description">Description</label>
          <textarea
            id="project-description"
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
            rows="4"
          />

          <label htmlFor="project-url">Project URL</label>
          <input
            id="project-url"
            type="url"
            placeholder="https://example.com"
            value={form.project_url}
            onChange={(event) =>
              setForm({ ...form, project_url: event.target.value })
            }
          />

          <label htmlFor="project-technologies">
            Technologies (comma-separated)
          </label>
          <input
            id="project-technologies"
            placeholder="React, CSS, Supabase"
            value={form.technologies}
            onChange={(event) =>
              setForm({ ...form, technologies: event.target.value })
            }
          />

          <label htmlFor="project-image">Project screenshot</label>
          <input
            id="project-image"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(event) => setImage(event.target.files?.[0] ?? null)}
          />

          <label className="admin-published-option">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(event) =>
                setForm({ ...form, published: event.target.checked })
              }
            />
            Publish this project
          </label>

          <button type="submit" disabled={busy}>
           {busy
  ? "Saving..."
  : editingId !== null
    ? "Update project"
    : "Add project"}
          </button>
        </form>
      </section>

      <section className="admin-panel">
        <h2>Your projects ({projects.length})</h2>

        {projects.length === 0 && <p>No projects in the database yet.</p>}

        <div className="admin-project-list">
          {projects.map((project) => (
            <article className="admin-project-item" key={project.id}>
              {project.image_url && (
                <img src={project.image_url} alt={project.title} />
              )}

              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p>{project.published ? "Published" : "Draft"}</p>
              </div>

              <div className="admin-project-actions">
  <button
    type="button"
    onClick={() => startEditing(project)}
  >
    Edit
  </button>

  <button
    type="button"
    onClick={() => togglePublished(project)}
  >
    {project.published ? "Unpublish" : "Publish"}
  </button>

  <button
    type="button"
    onClick={() => deleteProject(project)}
  >
    Delete
  </button>
            </div>
          </article>
        ))}
      </div>
    </section>
    </main>
);
}