import time
import requests

json_list = [
    {
        "channel": "google_reviews",
        "text": "La performance est excellente, aucun ralentissement.",
    },
    {"channel": "email", "text": "J'aimerais plus d'options de personnalisation."},
    {"channel": "twitter", "text": "Le processus d'inscription est simple et rapide."},
    {
        "channel": "facebook",
        "text": "L'application manque de certaines fonctionnalités avancées.",
    },
    {
        "channel": "manual",
        "text": "Le produit offre une excellente expérience utilisateur.",
    },
    {"channel": "sms", "text": "Le support client a été très réactif et efficace."},
    {
        "channel": "site_web",
        "text": "Je trouve les tarifs un peu élevés pour les fonctionnalités proposées.",
    },
    {"channel": "google_reviews", "text": "L'interface est moderne et intuitive."},
    {
        "channel": "email",
        "text": "J'ai rencontré un bug lors de l'exportation des rapports.",
    },
    {"channel": "twitter", "text": "La documentation pourrait être plus détaillée."},
    {
        "channel": "facebook",
        "text": "La performance est excellente, aucun ralentissement.",
    },
    {"channel": "manual", "text": "J'aimerais plus d'options de personnalisation."},
    {"channel": "sms", "text": "Le processus d'inscription est simple et rapide."},
    {
        "channel": "site_web",
        "text": "L'application manque de certaines fonctionnalités avancées.",
    },
    {
        "channel": "google_reviews",
        "text": "Le produit offre une excellente expérience utilisateur.",
    },
    {"channel": "email", "text": "Le support client a été très réactif et efficace."},
    {
        "channel": "twitter",
        "text": "Je trouve les tarifs un peu élevés pour les fonctionnalités proposées.",
    },
    {"channel": "facebook", "text": "L'interface est moderne et intuitive."},
    {
        "channel": "manual",
        "text": "J'ai rencontré un bug lors de l'exportation des rapports.",
    },
    {"channel": "sms", "text": "La documentation pourrait être plus détaillée."},
    {
        "channel": "site_web",
        "text": "La performance est excellente, aucun ralentissement.",
    },
    {
        "channel": "google_reviews",
        "text": "J'aimerais plus d'options de personnalisation.",
    },
    {"channel": "email", "text": "Le processus d'inscription est simple et rapide."},
    {
        "channel": "twitter",
        "text": "L'application manque de certaines fonctionnalités avancées.",
    },
    {
        "channel": "facebook",
        "text": "Le produit offre une excellente expérience utilisateur.",
    },
    {"channel": "manual", "text": "Le support client a été très réactif et efficace."},
    {
        "channel": "sms",
        "text": "Je trouve les tarifs un peu élevés pour les fonctionnalités proposées.",
    },
    {"channel": "site_web", "text": "L'interface est moderne et intuitive."},
    {
        "channel": "google_reviews",
        "text": "J'ai rencontré un bug lors de l'exportation des rapports.",
    },
    {"channel": "email", "text": "La documentation pourrait être plus détaillée."},
    {
        "channel": "twitter",
        "text": "La performance est excellente, aucun ralentissement.",
    },
    {"channel": "facebook", "text": "J'aimerais plus d'options de personnalisation."},
    {"channel": "manual", "text": "Le processus d'inscription est simple et rapide."},
    {
        "channel": "sms",
        "text": "L'application manque de certaines fonctionnalités avancées.",
    },
    {
        "channel": "site_web",
        "text": "Le produit offre une excellente expérience utilisateur.",
    },
    {
        "channel": "google_reviews",
        "text": "Le support client a été très réactif et efficace.",
    },
    {
        "channel": "email",
        "text": "Je trouve les tarifs un peu élevés pour les fonctionnalités proposées.",
    },
    {"channel": "twitter", "text": "L'interface est moderne et intuitive."},
    {
        "channel": "facebook",
        "text": "J'ai rencontré un bug lors de l'exportation des rapports.",
    },
    {"channel": "manual", "text": "La documentation pourrait être plus détaillée."},
    {"channel": "sms", "text": "La performance est excellente, aucun ralentissement."},
    {"channel": "site_web", "text": "J'aimerais plus d'options de personnalisation."},
    {
        "channel": "google_reviews",
        "text": "Le processus d'inscription est simple et rapide.",
    },
    {
        "channel": "email",
        "text": "L'application manque de certaines fonctionnalités avancées.",
    },
    {
        "channel": "twitter",
        "text": "Le produit offre une excellente expérience utilisateur.",
    },
    {
        "channel": "facebook",
        "text": "Le support client a été très réactif et efficace.",
    },
    {
        "channel": "manual",
        "text": "Je trouve les tarifs un peu élevés pour les fonctionnalités proposées.",
    },
    {"channel": "sms", "text": "L'interface est moderne et intuitive."},
    {
        "channel": "site_web",
        "text": "J'ai rencontré un bug lors de l'exportation des rapports.",
    },
    {
        "channel": "google_reviews",
        "text": "La documentation pourrait être plus détaillée.",
    },
    {
        "channel": "email",
        "text": "La performance est excellente, aucun ralentissement.",
    },
    {"channel": "twitter", "text": "J'aimerais plus d'options de personnalisation."},
    {"channel": "facebook", "text": "Le processus d'inscription est simple et rapide."},
    {
        "channel": "manual",
        "text": "L'application manque de certaines fonctionnalités avancées.",
    },
    {
        "channel": "sms",
        "text": "Le produit offre une excellente expérience utilisateur.",
    },
    {
        "channel": "site_web",
        "text": "Le support client a été très réactif et efficace.",
    },
    {
        "channel": "google_reviews",
        "text": "Je trouve les tarifs un peu élevés pour les fonctionnalités proposées.",
    },
    {"channel": "email", "text": "L'interface est moderne et intuitive."},
    {
        "channel": "twitter",
        "text": "J'ai rencontré un bug lors de l'exportation des rapports.",
    },
    {"channel": "facebook", "text": "La documentation pourrait être plus détaillée."},
    {
        "channel": "manual",
        "text": "La performance est excellente, aucun ralentissement.",
    },
    {"channel": "sms", "text": "J'aimerais plus d'options de personnalisation."},
    {"channel": "site_web", "text": "Le processus d'inscription est simple et rapide."},
    {
        "channel": "google_reviews",
        "text": "L'application manque de certaines fonctionnalités avancées.",
    },
    {
        "channel": "email",
        "text": "Le produit offre une excellente expérience utilisateur.",
    },
    {"channel": "twitter", "text": "Le support client a été très réactif et efficace."},
    {
        "channel": "facebook",
        "text": "Je trouve les tarifs un peu élevés pour les fonctionnalités proposées.",
    },
    {"channel": "manual", "text": "L'interface est moderne et intuitive."},
    {
        "channel": "sms",
        "text": "J'ai rencontré un bug lors de l'exportation des rapports.",
    },
    {"channel": "site_web", "text": "La documentation pourrait être plus détaillée."},
    {
        "channel": "google_reviews",
        "text": "La performance est excellente, aucun ralentissement.",
    },
    {"channel": "email", "text": "J'aimerais plus d'options de personnalisation."},
    {"channel": "twitter", "text": "Le processus d'inscription est simple et rapide."},
    {
        "channel": "facebook",
        "text": "L'application manque de certaines fonctionnalités avancées.",
    },
    {
        "channel": "manual",
        "text": "Le produit offre une excellente expérience utilisateur.",
    },
    {"channel": "sms", "text": "Le support client a été très réactif et efficace."},
    {
        "channel": "site_web",
        "text": "Je trouve les tarifs un peu élevés pour les fonctionnalités proposées.",
    },
    {"channel": "google_reviews", "text": "L'interface est moderne et intuitive."},
    {
        "channel": "email",
        "text": "J'ai rencontré un bug lors de l'exportation des rapports.",
    },
    {"channel": "twitter", "text": "La documentation pourrait être plus détaillée."},
    {
        "channel": "facebook",
        "text": "La performance est excellente, aucun ralentissement.",
    },
    {"channel": "manual", "text": "J'aimerais plus d'options de personnalisation."},
    {"channel": "sms", "text": "Le processus d'inscription est simple et rapide."},
    {
        "channel": "site_web",
        "text": "L'application manque de certaines fonctionnalités avancées.",
    },
    {
        "channel": "google_reviews",
        "text": "Le produit offre une excellente expérience utilisateur.",
    },
    {"channel": "email", "text": "Le support client a été très réactif et efficace."},
    {
        "channel": "twitter",
        "text": "Je trouve les tarifs un peu élevés pour les fonctionnalités proposées.",
    },
    {"channel": "facebook", "text": "L'interface est moderne et intuitive."},
    {
        "channel": "manual",
        "text": "J'ai rencontré un bug lors de l'exportation des rapports.",
    },
    {"channel": "sms", "text": "La documentation pourrait être plus détaillée."},
    {
        "channel": "site_web",
        "text": "La performance est excellente, aucun ralentissement.",
    },
    {
        "channel": "google_reviews",
        "text": "J'aimerais plus d'options de personnalisation.",
    },
    {"channel": "email", "text": "Le processus d'inscription est simple et rapide."},
    {
        "channel": "twitter",
        "text": "L'application manque de certaines fonctionnalités avancées.",
    },
    {
        "channel": "facebook",
        "text": "Le produit offre une excellente expérience utilisateur.",
    },
    {"channel": "manual", "text": "Le support client a été très réactif et efficace."},
    {
        "channel": "sms",
        "text": "Je trouve les tarifs un peu élevés pour les fonctionnalités proposées.",
    },
    {"channel": "site_web", "text": "L'interface est moderne et intuitive."},
    {
        "channel": "google_reviews",
        "text": "J'ai rencontré un bug lors de l'exportation des rapports.",
    },
    {"channel": "email", "text": "La documentation pourrait être plus détaillée."},
    {
        "channel": "twitter",
        "text": "La performance est excellente, aucun ralentissement.",
    },
    {"channel": "facebook", "text": "J'aimerais plus d'options de personnalisation."},
    {"channel": "manual", "text": "Le processus d'inscription est simple et rapide."},
    {
        "channel": "sms",
        "text": "L'application manque de certaines fonctionnalités avancées.",
    },
    {
        "channel": "site_web",
        "text": "Le produit offre une excellente expérience utilisateur.",
    },
    {
        "channel": "google_reviews",
        "text": "Le support client a été très réactif et efficace.",
    },
    {
        "channel": "email",
        "text": "Je trouve les tarifs un peu élevés pour les fonctionnalités proposées.",
    },
    {"channel": "twitter", "text": "L'interface est moderne et intuitive."},
    {
        "channel": "facebook",
        "text": "J'ai rencontré un bug lors de l'exportation des rapports.",
    },
    {"channel": "manual", "text": "La documentation pourrait être plus détaillée."},
    {"channel": "sms", "text": "La performance est excellente, aucun ralentissement."},
    {"channel": "site_web", "text": "J'aimerais plus d'options de personnalisation."},
    {
        "channel": "google_reviews",
        "text": "Le processus d'inscription est simple et rapide.",
    },
    {
        "channel": "email",
        "text": "L'application manque de certaines fonctionnalités avancées.",
    },
    {
        "channel": "twitter",
        "text": "Le produit offre une excellente expérience utilisateur.",
    },
    {
        "channel": "facebook",
        "text": "Le support client a été très réactif et efficace.",
    },
    {
        "channel": "manual",
        "text": "Je trouve les tarifs un peu élevés pour les fonctionnalités proposées.",
    },
    {"channel": "sms", "text": "L'interface est moderne et intuitive."},
    {
        "channel": "site_web",
        "text": "J'ai rencontré un bug lors de l'exportation des rapports.",
    },
    {
        "channel": "google_reviews",
        "text": "La documentation pourrait être plus détaillée.",
    },
    {
        "channel": "email",
        "text": "La performance est excellente, aucun ralentissement.",
    },
    {"channel": "twitter", "text": "J'aimerais plus d'options de personnalisation."},
    {"channel": "facebook", "text": "Le processus d'inscription est simple et rapide."},
    {
        "channel": "manual",
        "text": "L'application manque de certaines fonctionnalités avancées.",
    },
    {
        "channel": "sms",
        "text": "Le produit offre une excellente expérience utilisateur.",
    },
    {
        "channel": "site_web",
        "text": "Le support client a été très réactif et efficace.",
    },
    {
        "channel": "google_reviews",
        "text": "Je trouve les tarifs un peu élevés pour les fonctionnalités proposées.",
    },
    {"channel": "email", "text": "L'interface est moderne et intuitive."},
    {
        "channel": "twitter",
        "text": "J'ai rencontré un bug lors de l'exportation des rapports.",
    },
    {"channel": "facebook", "text": "La documentation pourrait être plus détaillée."},
    {
        "channel": "manual",
        "text": "La performance est excellente, aucun ralentissement.",
    },
    {"channel": "sms", "text": "J'aimerais plus d'options de personnalisation."},
    {"channel": "site_web", "text": "Le processus d'inscription est simple et rapide."},
    {
        "channel": "google_reviews",
        "text": "L'application manque de certaines fonctionnalités avancées.",
    },
    {
        "channel": "email",
        "text": "Le produit offre une excellente expérience utilisateur.",
    },
    {"channel": "twitter", "text": "Le support client a été très réactif et efficace."},
    {
        "channel": "facebook",
        "text": "Je trouve les tarifs un peu élevés pour les fonctionnalités proposées.",
    },
    {"channel": "manual", "text": "L'interface est moderne et intuitive."},
    {
        "channel": "sms",
        "text": "J'ai rencontré un bug lors de l'exportation des rapports.",
    },
    {"channel": "site_web", "text": "La documentation pourrait être plus détaillée."},
    {
        "channel": "google_reviews",
        "text": "La performance est excellente, aucun ralentissement.",
    },
    {"channel": "email", "text": "J'aimerais plus d'options de personnalisation."},
    {"channel": "twitter", "text": "Le processus d'inscription est simple et rapide."},
    {
        "channel": "facebook",
        "text": "L'application manque de certaines fonctionnalités avancées.",
    },
    {
        "channel": "manual",
        "text": "Le produit offre une excellente expérience utilisateur.",
    },
    {"channel": "sms", "text": "Le support client a été très réactif et efficace."},
    {
        "channel": "site_web",
        "text": "Je trouve les tarifs un peu élevés pour les fonctionnalités proposées.",
    },
    {"channel": "google_reviews", "text": "L'interface est moderne et intuitive."},
    {
        "channel": "email",
        "text": "J'ai rencontré un bug lors de l'exportation des rapports.",
    },
    {"channel": "twitter", "text": "La documentation pourrait être plus détaillée."},
    {
        "channel": "facebook",
        "text": "La performance est excellente, aucun ralentissement.",
    },
    {"channel": "manual", "text": "J'aimerais plus d'options de personnalisation."},
    {"channel": "sms", "text": "Le processus d'inscription est simple et rapide."},
    {
        "channel": "site_web",
        "text": "L'application manque de certaines fonctionnalités avancées.",
    },
    {
        "channel": "google_reviews",
        "text": "Le produit offre une excellente expérience utilisateur.",
    },
    {"channel": "email", "text": "Le support client a été très réactif et efficace."},
    {
        "channel": "twitter",
        "text": "Je trouve les tarifs un peu élevés pour les fonctionnalités proposées.",
    },
    {"channel": "facebook", "text": "L'interface est moderne et intuitive."},
    {
        "channel": "manual",
        "text": "J'ai rencontré un bug lors de l'exportation des rapports.",
    },
    {"channel": "sms", "text": "La documentation pourrait être plus détaillée."},
    {
        "channel": "site_web",
        "text": "La performance est excellente, aucun ralentissement.",
    },
    {
        "channel": "google_reviews",
        "text": "J'aimerais plus d'options de personnalisation.",
    },
    {"channel": "email", "text": "Le processus d'inscription est simple et rapide."},
    {
        "channel": "twitter",
        "text": "L'application manque de certaines fonctionnalités avancées.",
    },
    {
        "channel": "facebook",
        "text": "Le produit offre une excellente expérience utilisateur.",
    },
    {"channel": "manual", "text": "Le support client a été très réactif et efficace."},
    {
        "channel": "sms",
        "text": "Je trouve les tarifs un peu élevés pour les fonctionnalités proposées.",
    },
    {"channel": "site_web", "text": "L'interface est moderne et intuitive."},
    {
        "channel": "google_reviews",
        "text": "J'ai rencontré un bug lors de l'exportation des rapports.",
    },
    {"channel": "email", "text": "La documentation pourrait être plus détaillée."},
    {
        "channel": "twitter",
        "text": "La performance est excellente, aucun ralentissement.",
    },
    {"channel": "facebook", "text": "J'aimerais plus d'options de personnalisation."},
    {"channel": "manual", "text": "Le processus d'inscription est simple et rapide."},
    {
        "channel": "sms",
        "text": "L'application manque de certaines fonctionnalités avancées.",
    },
    {
        "channel": "site_web",
        "text": "Le produit offre une excellente expérience utilisateur.",
    },
    {
        "channel": "google_reviews",
        "text": "Le support client a été très réactif et efficace.",
    },
    {
        "channel": "email",
        "text": "Je trouve les tarifs un peu élevés pour les fonctionnalités proposées.",
    },
    {"channel": "twitter", "text": "L'interface est moderne et intuitive."},
    {
        "channel": "facebook",
        "text": "J'ai rencontré un bug lors de l'exportation des rapports.",
    },
    {"channel": "manual", "text": "La documentation pourrait être plus détaillée."},
    {"channel": "sms", "text": "La performance est excellente, aucun ralentissement."},
    {"channel": "site_web", "text": "J'aimerais plus d'options de personnalisation."},
    {
        "channel": "google_reviews",
        "text": "Le processus d'inscription est simple et rapide.",
    },
    {
        "channel": "email",
        "text": "L'application manque de certaines fonctionnalités avancées.",
    },
    {
        "channel": "twitter",
        "text": "Le produit offre une excellente expérience utilisateur.",
    },
    {
        "channel": "facebook",
        "text": "Le support client a été très réactif et efficace.",
    },
    {
        "channel": "manual",
        "text": "Je trouve les tarifs un peu élevés pour les fonctionnalités proposées.",
    },
    {"channel": "sms", "text": "L'interface est moderne et intuitive."},
    {
        "channel": "site_web",
        "text": "J'ai rencontré un bug lors de l'exportation des rapports.",
    },
    {
        "channel": "google_reviews",
        "text": "La documentation pourrait être plus détaillée.",
    },
    {
        "channel": "email",
        "text": "La performance est excellente, aucun ralentissement.",
    },
    {"channel": "twitter", "text": "J'aimerais plus d'options de personnalisation."},
    {"channel": "facebook", "text": "Le processus d'inscription est simple et rapide."},
    {
        "channel": "manual",
        "text": "L'application manque de certaines fonctionnalités avancées.",
    },
]


# API endpoint URL
url = "https://feedback-producer.onrender.com/feedbacks"

# Optional: headers (e.g., for authentication)
headers = {
    "Content-Type": "application/json",
    # "Authorization": "Bearer YOUR_TOKEN",  # Uncomment if needed
}

for data in json_list:
    response = requests.post(url, json=data, headers=headers)
    print(f"Status: {response.status_code}, Response: {response.text}")
    time.sleep(2)
