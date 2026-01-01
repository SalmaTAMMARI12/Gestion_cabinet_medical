// Base de données simulée des utilisateurs
const users = {
  // Admins
  admins: [
    {
      email: 'admin@cabinet-medical.fr',
      password: 'Admin@123',
      nom: 'Administrateur',
      nom_utilisateur: 'Système',
      prenom_utilisateur: 'Admin',
      role: 'admin',
      roles: ['admin']
    }
  ],
  
  // Employés
  employees: [
    {
      email: 'medecin@cabinet-medical.fr',
      password: 'Medecin@123',
      nom: 'Dr. Benali',
      nom_utilisateur: 'Benali',
      prenom_utilisateur: 'Karim',
      role: 'medecin',
      roles: ['employe', 'medecin']
    },
    {
      email: 'secretaire@cabinet-medical.fr',
      password: 'Secret@123',
      nom: 'Mme Alami',
      nom_utilisateur: 'Alami',
      prenom_utilisateur: 'Fatima',
      role: 'secretaire',
      roles: ['employe', 'secretaire']
    }
  ],
  
  // Patients
  patients: [
    {
      email: 'patient@gmail.com',
      password: 'Patient@123',
      nom: 'Ahmed Alami',
      nom_utilisateur: 'Alami',
      prenom_utilisateur: 'Ahmed',
      role: 'patient',
      roles: ['patient']
    }
  ]
};

// Fonction de connexion
export const login = (email, password, userType) => {
  let userList;
  
  // Déterminer la liste selon le type
  if (userType === 'employee') {
    userList = [...users.admins, ...users.employees];
  } else {
    userList = users.patients;
  }
  
  // Chercher l'utilisateur
  const user = userList.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  
  if (user) {
    // Connexion réussie
    return {
      success: true,
      user: {
        email: user.email,
        nom: user.nom,
        nom_utilisateur: user.nom_utilisateur || user.nom,
        prenom_utilisateur: user.prenom_utilisateur || '',
        role: user.role,
        roles: user.roles || [user.role]
      }
    };
  } else {
    // Échec
    return {
      success: false,
      error: 'Email ou mot de passe incorrect'
    };
  }
};

// Fonction pour sauvegarder l'utilisateur connecté
export const saveCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

// Fonction pour récupérer l'utilisateur connecté
export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

// Fonction de déconnexion
export const logout = () => {
  localStorage.removeItem('currentUser');
};

// Vérifier si l'utilisateur est admin
export const isAdmin = (user) => {
  return user && user.roles && user.roles.includes('admin');
};