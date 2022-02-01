const express = require('express');
const bodyParser = require("body-parser");
const axios = require('axios');
var path = require('path');
const cheerio = require('cheerio');
var https = require('https');
const app = express();
const stringSimilarity = require('string-similarity'); 
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
var WilayaOO = ["NA","Adrar","Chlef","Laghouat","Oum El Bouaghi","Batna","Béjaia","Biskra","Béchar","Blida","Bouira","Tamanrasset","Tébessa","Tlemcen","Tiaret","Tizi Ouzou","Alger","Djelfa","Jijel","Sétif","Saïda","Skikda","Sidi Bel Abbès","Annaba","Guelma","Constantine","Médéa","Mostaganem","M'Sila","Mascara","Ouargla","Oran","El Bayadh","Illizi","Bordj Bou Arreridj","Boumerdès","El Tarf","Tindouf","Tissemsilt","El Oued","Khenchela","Souk Ahras","Tipaza","Mila","Ain Defla","Naâma","Ain Témouchent","Ghardaia","Relizane"]
//var communeBlida = [{value:"283",name:"Aïn Romana"},{value:"280",name:"Beni Mered"},{value:"278",name:"Beni Tamou"},{value:"269",name:"Benkhelil"},{value:"260",name:"Blida"},{value:"279",name:"Bouarfa"},{value:"275",name:"Boufarik"},{value:"281",name:"Bougara"},{value:"262",name:"Bouinan"},{value:"261",name:"Chebli"},{value:"267",name:"Chiffa"},{value:"265",name:"Chréa"},{value:"284",name:"Djebabra"},{value:"266",name:"El Affroun"},{value:"282",name:"Guerouaou"},{value:"268",name:"Hammam Melouane"},{value:"276",name:"Larbaa"},{value:"273",name:"Meftah"},{value:"271",name:"Mouzaia"},{value:"263",name:"Oued Alleug"},{value:"277",name:"Oued Djer"},{value:"274",name:"Ouled Slama"},{value:"264",name:"Ouled Yaïch"},{value:"272",name:"Souhane"},{value:"270",name:"Soumaa"}]
//var communeAlger = [{value:"567",name:"Aïn Benian" },{value:"561",name:"Aïn Taya" },{value:"524",name:"Alger-Centre" },{value:"528",name:"Bab El Oued" },{value:"544",name:"Bab Ezzouar" },{value:"578",name:"Baba Hassen" },{value:"539",name:"Bachdjerrah" },{value:"537",name:"Baraki" },{value:"527",name:"Belouizdad" },{value:"545",name:"Ben Aknoun" },{value:"555",name:"Beni Messous" },{value:"532",name:"Bir Mourad Raïs" },{value:"535",name:"Birkhadem" },{value:"557",name:"Birtouta" },{value:"529",name:"Bologhine" },{value:"562",name:"Bordj El Bahri" },{value:"553",name:"Bordj El Kiffan" },{value:"542",name:"Bourouba" },{value:"534",name:"Bouzareah" },{value:"530",name:"Casbah" },{value:"573",name:"Cheraga" },{value:"543",name:"Dar El Beïda" },{value:"546",name:"Dely Ibrahim" },{value:"577",name:"Douera" },{value:"576",name:"Draria" },{value:"575",name:"El Achour" },{value:"533",name:"El Biar" },{value:"547",name:"El Hammamet" },{value:"536",name:"El Harrach" },{value:"526",name:"El Madania" },{value:"554",name:"El Magharia" },{value:"563",name:"El Marsa" },{value:"550",name:"El Mouradia" },{value:"549",name:"Gué de Constantine" },{value:"564",name:"H'raoua" },{value:"540",name:"Hussein Dey" },{value:"551",name:"Hydra" },{value:"579",name:"Khraicia" },{value:"541",name:"Kouba" },{value:"556",name:"Les Eucalyptus" },{value:"570",name:"Mahelma" },{value:"552",name:"Mohammadia" },{value:"531",name:"Oued Koriche" },{value:"538",name:"Oued Smar" },{value:"559",name:"Ouled Chebel" },{value:"574",name:"Ouled Fayet" },{value:"571",name:"Rahmania" },{value:"548",name:"Raïs Hamidou" },{value:"566",name:"Reghaïa" },{value:"565",name:"Rouïba" },{value:"580",name:"Saoula" },{value:"525",name:"Sidi M'Hamed" },{value:"560",name:"Sidi Moussa" },{value:"572",name:"Souidania" },{value:"568",name:"Staoueli" },{value:"558",name:"Tessala El Merdja" },{value:"569",name:"Zeralda" }]
var Wilaya = ["All","Adrar","Chlef","Laghouat","Oum El Bouaghi","Batna","Bijaia","Biskra","Béchar","Blida","Bouira","Tamanrasset","Tébessa","Tlemcen","Tiaret","Tizi Ouzou","Alger","Djelfa","Jijel","Sétif","Saaida","Skikda","Sidi Bel Abbès","Annaba","Guelma","Constantine","Midia","Mostaganem","MSila","Mascara","Ouargla","Oran","El Bayadh","Illizi","Bordj Bou Arreridj","Boumerdès","El Tarf","Tindouf","Tissemsilt","El Oued","Khenchela","Souk Ahras","Tipaza","Mila","Ain Defla","Naama","Ain Témouchent","Gardaia","Relizane"]
var WilayaEn = ["All","Adrar","Chlef","Laghouat","Oum El Bouaghi","Batna","Bijaia","Biskra","Béchar","Blida","Bouira","Tamanrasset","Tébessa","Tlemcen","Tiaret","Tizi Ouzou","Algiers","Djelfa","Jijel","Setif","Saaida","Skikda","Sidi Bel Abbès","Annaba","Guelma","Constantine","Media","Mostaganem","MSila","Mascara","Ouargla","Oran","El Bayadh","Illizi","Bordj Bou Arreridj","Boumerdès","El Tarf","Tindouf","Tissemsilt","El Oued","Khenchela","Souk Ahras","Tipaza","Mila","Ain Defla","Naama","Ain Témouchent","Gardaia","Relizane"]

var Speciality = ["NA","Acupuncture","Allergologue","Anatomo Cyto Pathologiste","Anesthésiste","Audioprothésiste","Biochimiste","Biologiste","Cancerologue","Cardiologue","Centre d'Imagerie Médicale","Chimiothérapeute","Chirurgien Généraliste","Dermatologue","Diabétologue Endocrinologue","Gastro Entérologue","Gynécologue Obstétricien","Hématologue","Hépatologue","Infectiologue","Infirmier - Infrimiére","Kinesithérapeute","Médecin assermenté","Médecin du sport","Médecin généraliste","Médecin réanimateur","Nephrologue","Neurochirurgien","Neurologue","Nutritionniste","O R L","Ophtalmologue","Orthophoniste","Orthoptiste","Ostéopathe","Pédiatre","Physiologue","Pneumo Phtisiologue","Podologue","Psychiatre","Psychologue","Psychopédagogue","Rééducation Fonctionnelle","Rhumatologue","Sexologue","Médecin dentiste","Endodontiste","Implantologiste","Orthodontiste","Parodontologiste","Pédodontiste","Patho Bucco Dentaire","Prothésiste dentaire","Médecin interniste","Neurophysiologie","Chirurgien Orthopédiste Traumatologue","Chirurgien Urologue","Médecin dentiste spécialiste","Gynécologue","Chirurgien Infantile","Médecin légiste","Parasitologue","Médecin de travail","Epidémiologue","Médecine esthétique","Chirurgien Cervico, Maxillo-Faciale, Réparatrice et Esthétique","Sénologue","Cytopathologue","Neuropédiatre","Neuropsychiatre","Laboratoire d'analyse médicale","Orthopédie pédiatrique","Cabinet de groupe","Andrologue","Médecine nucléaire","Centre de diagnostique médical","Assistance médicale","Chirurgie Vasculaire","Médecin physique","Cupping Thérapie Hidjama","Tourisme Médical","Centre de soins corporels"]
var SpecialtyEn = ["NA", "Acupuncture", "Allergologist", "Anatomo Cyto Pathologist", "Anesthesiologist", "Audioprosthetist", "Biochemist", "Biologist", "Cancerologist", "Cardiologist","Medical Imaging "," Chemotherapist "," General Surgeon "," Dermatologist "," Diabetologist Endocrinologist "," Gastroenterologist "," Obstetrician Gynecologist "," Hematologist "," Hepatologist "," Infectious Disease "," Nurse - Infirmary ", "Physiotherapist", "Sworn doctor", "Sports doctor", "General practitioner", "Resuscitating doctor", "Nephrologist", "Neurosurgeon", "Neurologist", "Nutritionist", "ENT", "Ophthalmologist", " Speech therapist "," Orthoptist "," Osteopath "," Pediatrician "," Physiologist "," Pneumo Phtisiologist "," Podiatrist "," Psychiatrist "," Psychologist "," Psychopedagogue "," Functional Reeducation "," Rheumatologist "," Sexologist "," Dentist "," Endodontist "," Implantologist "," Orthodontist "," Periodontist "," Pediatric dentist "," Patho Bucco Dentaire "," Dental technician "," Internist doctor "," Neu rophysiology "," Orthopedic Trauma Surgeon "," Urological Surgeon "," Specialist dentist "," Gynecologist "," Child surgeon "," Forensic doctor "," Parasitologist "," Occupational doctor "," Epidemiologist "," Medicine aesthetic "," Cervico, Maxillofacial, Restorative and Aesthetic Surgeon "," Senologist "," Cytopathologist "," Neuropediatrician "," Neuropsychiatrist "," Medical analysis laboratory "," Pediatric orthopedics "," Group practice " , "Andrologist", "Nuclear Medicine", "Medical Diagnostic Center", "Medical Assistance", "Vascular Surgery", "Physical Doctor", "Cupping Therapy Hidjama", "Medical Tourism", "Body Care Center "]
var ValueSpec = ["0","1","2","3","4","5","6","7","8","9","14","15","18","24","28","29","30","31","32","33","34","35","36","37","39","40","42","43","44","45","46","47","49","50","51","52","53","54","55","56","57","58","61","62","63","67","68","69","71","72","73","74","75","76","78","80","82","83","84","85","86","87","89","93","99","100","101","102","103","104","105","106","107","108","109","110","111","112","113","114","116","117","118","119","120","121","123","124"]
 var services = [{value:"0", word:"Service" },{value:"1", word:"ODF" },{value:"1", word:"Orthodontie"},{value:"1", word:"orthopédie dento-faciale"},{value:"1", word:"O.D.F"},{value:"2", word:"Extraction Dentaire" },{value:"3", word:"Consultations générales" },{value:"4", word:"Thérapie par les ventouses HIDJAMA" },{value:"5", word:"Hidjama Esthétique" },{value:"6", word:"Soins à domicile" },{value:"7", word:"Soins infirmiers" },{value:"8", word:"Traitement des douleurs" },{value:"9", word:"Rhumatisme" },{value:"11", word:"Sciatique" },{value:"12", word:"Entorse" },{value:"13", word:"Tendinite" },{value:"14", word:"Stress" },{value:"15", word:"Surpoids" },{value:"16", word:"Obésité" },{value:"17", word:"Migraine" },{value:"18", word:"Paralysie faciale" },{value:"19", word:"Vomissement de la grossesse" },{value:"20", word:"Sinusite" },{value:"21", word:"Allergies" },{value:"23", word:"Analyses médicales" },{value:"24", word:"Conseils" },{value:"25", word:"Services au Entreprises" },{value:"26", word:"Tourisme Médicale" },{value:"29", word:"VSL" },{value:"30", word:"Audiométrie tonale" },{value:"32", word:"Audiométrie vocale" },{value:"33", word:"Audiométrie comportementale" },{value:"34", word:"Appareillage auditif" },{value:"35", word:"Confection de stop bruit" },{value:"36", word:"Confection de stop bouchons" },{value:"37", word:"Test de dépistage" },{value:"38", word:"Audiométrie" },{value:"39", word:"Appareillage auditif Numérique" },{value:"40", word:"Confection d'Embout" },{value:"41", word:"Confection de Bouchon de piscine" },{value:"44", word:"Psychomotricité" },{value:"45", word:"Orthophonie" },{value:"46", word:"Psychologie" },{value:"47", word:"Echodoppler Cardique" },{value:"48", word:"Echodoppler vasculaire" },{value:"49", word:"Holter Tensionnel MAPA" },{value:"50", word:"Holter ECG" },{value:"51", word:"Echographie Doppler couleur cardiaque" },{value:"52", word:"Echographie cardiaque trans oesophagienne" },{value:"53", word:"Echographie Doppler Vasculaire" },{value:"54", word:"Épreuve d’effort" },{value:"55", word:"Cardiologue pédiatrique" },{value:"56", word:"Cardiologue interventionnelle" },{value:"57", word:"Échocardiographie de Stress" },{value:"58", word:"Holter" },{value:"59", word:"Consultations Spécialisées" },{value:"60", word:"Echocardiographie" },{value:"61", word:"Coronarographie" },{value:"62", word:"Mammographie" },{value:"63", word:"Panoramique Dentaire" },{value:"64", word:"Echographie" },{value:"65", word:"Radiologie Numérisé" },{value:"66", word:"Echographie Doppler Couleur" },{value:"67", word:"Radiologue conventionnelle" },{value:"68", word:"Dentaire numeriques" },{value:"69", word:"HYSTEROSALPINGOGRAPHIE" },{value:"70", word:"MAMMOGRAPHIE NUMERIQUE" },{value:"71", word:"ECHOGRAPHIE GENERALE" },{value:"72", word:"Tumeurs cutanées de la face" },{value:"73", word:"Lifting Cervico Facial" },{value:"74", word:"Liposucion" },{value:"75", word:"Comblement des Rides Profondes" },{value:"76", word:"Fentes labiovélo-Platines" },{value:"77", word:"Dysmorphoses Angiomes" },{value:"78", word:"Chirurgie des paupières" },{value:"79", word:"Oreilles décollées" },{value:"80", word:"Fracture des Os de la face" },{value:"81", word:"Plaies et Brulures de la face" },{value:"82", word:"Chirurgie des sinus" },{value:"83", word:"Chirurgie du cou" },{value:"84", word:"Chirurgie de Rajeunissement" },{value:"85", word:"Médecine de Rajeunissement" },{value:"86", word:"Tumeurs: Cutanées, endobuccales et du cou" },{value:"87", word:"Dysmorphoses Faciales" },{value:"88", word:"Chirurgie Esthétique de la face" },{value:"89", word:"Chirurgie des cicatrices" },{value:"90", word:"Anomalies congénitales" },{value:"91", word:"Chirurgie reconstructrice de la face" },{value:"92", word:"Cancers cutanés" },{value:"93", word:"Chirurgie Dermatologique" },{value:"94", word:"Cancers de la face" },{value:"95", word:"Chirurgie de la cavité buccale" },{value:"96", word:"Chirurgie de l'articulation temporo-mandibulaire" },{value:"97", word:"Pathologies des glandes salivares" },{value:"98", word:"Chirurgie pré-implantaire" },{value:"99", word:"Traumatisme de la face" },{value:"100", word:"Injection acide Hyoluronique" },{value:"101", word:"Botox" },{value:"102", word:"circoncisions" },{value:"103", word:"Kystes sébacés" },{value:"104", word:"Ongles incarnés" },{value:"105", word:"Interventions chirurgicales" },{value:"106", word:"Soins Dentaires à UV" },{value:"107", word:"Extraction Dentaire 2" },{value:"108", word:"Blanchiment des Dents" },{value:"109", word:"Détartrage" },{value:"110", word:"Prothèse Fixe" },{value:"111", word:"Prothèse amovibles" },{value:"112", word:"Petites Chirurgies" },{value:"113", word:"Détartrage aux ULTRASONS" },{value:"114", word:"Prothèses mobiles" },{value:"115", word:"Prothèses flexible" },{value:"116", word:"Soins Dentaires" },{value:"117", word:"Esthétique Dentaire" },{value:"118", word:"Facettes Céramiques" },{value:"119", word:"Prothèses dentaires" },{value:"120", word:"Implantologie" },{value:"121", word:"prothèse" },{value:"122", word:"Chirurgie Dentaire" },{value:"123", word:"Détartrage à l'ultrason" },{value:"124", word:"Implants" },{value:"125", word:"Prothèse Céramique" },{value:"126", word:"Céramique" },{value:"127", word:"Prothèse Mobile" },{value:"128", word:"ODF Fixe" },{value:"129", word:"ODF Amovible" },{value:"130", word:"Facettes Céramiques" },{value:"131", word:"Soins Céramiques" },{value:"132", word:"Chirurgie Buccale" },{value:"134", word:"Facettes Dentaire" },{value:"135", word:"Orthodontie Invisible par Aligneurs" },{value:"136", word:"Céramique zircone" },{value:"137", word:"Facettes" },{value:"138", word:"ODF mobile" },{value:"139", word:"Radio à Vision Directe" },{value:"140", word:"Chirurgie" },{value:"141", word:"Soins parodontaux" },{value:"142", word:"Implantologie" },{value:"143", word:"Chirurgie orale" },{value:"144", word:"Chirurgie pédiatrique" },{value:"145", word:"Orthopédie pédiatrique" },{value:"146", word:"Chirurgie Palliative" },{value:"147", word:"Chirurgie Micro-chirurgie" },{value:"148", word:"Chirurgie Orthopédique" },{value:"150", word:"Chirurgie Traumatologie" },{value:"151", word:"Chirurgie de la Main" },{value:"152", word:"Chirurgie des Nerfs Périphériques" },{value:"153", word:"Chirurgie du Plexus Brachial" },{value:"154", word:"Maladies des Os" },{value:"155", word:"Maladies des Articulations" },{value:"156", word:"Traumatologie Sportive" },{value:"157", word:"Urgences Traumatologiques" },{value:"158", word:"Pathologies Orthopédiques" },{value:"159", word:"Infiltrations" },{value:"160", word:"URGENCES TRAUMATOLOGIE" },{value:"161", word:"Chirurgie de la plexus brachial" },{value:"162", word:"Chirurgie Prothétique 3" },{value:"163", word:"Chirurgie du Rachis" },{value:"164", word:"Chirurgie du genou" },{value:"165", word:"Chirurgie arthroscopie" },{value:"166", word:"Maladies des articulations" },{value:"167", word:"Maladies Rhumatismale" },{value:"168", word:"Rééducation Fonctionnelle des maladies orthopédique" },{value:"169", word:"Radiologie numérisée" },{value:"170", word:"Traitement de l’Obésité" },{value:"171", word:"maladies Coeliaque" },{value:"172", word:"Diabète" },{value:"173", word:"Spécialiste en Orthopedie" },{value:"174", word:"Spécialiste en traumatologie" },{value:"175", word:"Spécialiste en articulations" }
   ,{value:"176", word:"Radiographie" },{value:"177", word:"Pathologie sportives" },{value:"178", word:"Rhumatologie" },{value:"179", word:"Chirurgie du Rachis" },{value:"180", word:"Chirurgie Prothétique 2" },{value:"181", word:"Chirurgie Infantile" },{value:"182", word:"Arthrose" },{value:"183", word:"Sciatique" },{value:"184", word:"Hernie discale" },{value:"185", word:"Scoliose" },{value:"186", word:"Menisque" },{value:"187", word:"Laxitées" },{value:"188", word:"Traumatologie" },{value:"189", word:"Chirurgie Prothétique" },{value:"190", word:"Chirurgie arthroscopie" },{value:"191", word:"Prise en charge des Fractures" },{value:"192", word:"Orthopédie du Rachis" },{value:"193", word:"Pied Diabétique" },{value:"194", word:"Echographie Ostéo-articulaire" },{value:"195", word:"Tapis course Runtime  Runtime Software" },{value:"196", word:"Semelle 3D Orthopédique Personnalisé Machine VULCAN." },{value:"197", word:"Chirurgie du Pied" },{value:"198", word:"Exploration baropodométre électronique" },{value:"199", word:"Exploration Podoscan 3D" },{value:"200", word:"Traitement d'Arthrose" },{value:"201", word:"Hypertension Diabète" },{value:"202", word:"Rhumatisme ECG" },{value:"203", word:"Urgences Médicales" },{value:"204", word:"Chirurgie laparoscopique" },{value:"205", word:"Infertilité" },{value:"206", word:"Lithotripsie laparoscopique" },{value:"207", word:"Chirurgie voies Urinaires" },{value:"208", word:"Chirurgie reins" },{value:"209", word:"Chirurgie prostate" },{value:"210", word:"chirurgie Stérilité masculine" },{value:"211", word:"Chirurgie endoscopie" },{value:"212", word:"Chirurgie URETEROSCOPIE" },{value:"214", word:"Maladies de la vessie" },{value:"215", word:"Urétéroscopie avec Laser" },{value:"216", word:"Impuissance sexuelle" },{value:"217", word:"Appareil génital" },{value:"218", word:"Biopsie prostatique" },{value:"219", word:"LASER DEPILATOIRE" },{value:"220", word:"LASER RAJEUNISSEMENT" },{value:"221", word:"CHIRURGIE ESTHETIQUE" },{value:"222", word:"CHIRURGIE  RÉPARATRICE" },{value:"223", word:"CARBOXYTHERAPIE" },{value:"224", word:"MÉSOTHÉRAPIE" },{value:"225", word:"CICATRICES D'ACNÉ" },{value:"226", word:"TACHES PIGMENTÉES" },{value:"227", word:"poils" },{value:"228", word:"TRAITEMENT CHUTE DE CHEVEUX" },{value:"229", word:"Dermapen" },{value:"230", word:"vergetures" },{value:"231", word:"Laser Dé-tatouage" },{value:"232", word:"Dermatologie" },{value:"233", word:"Épilation LASER" },{value:"234", word:"Lasers Esthétique" },{value:"235", word:"Traitement des Maladies" },{value:"236", word:"Allergies de la peau" },{value:"237", word:"des Maladies des Ongles" },{value:"238", word:"Nettoyage de la peau" },{value:"239", word:"Peelings médicaux" },
   {value:"240", word:"Traitement plasma riche en plaquettes PRP" },{value:"241", word:"Rajeunissement Facial" },{value:"242", word:"traitement des rides et Cicatrices" },{value:"243", word:"Maladies de la peau" },{value:"244", word:"Maladies du cuir chevelu" },{value:"245", word:"Maladies Vénériennes" },{value:"246", word:"Cryothérapie" },{value:"247", word:"Maladies Varices" },{value:"248", word:"Epilation Electrique" },{value:"249", word:"Médecine Esthétique" },{value:"250", word:"Comblements" },{value:"251", word:"Traitement par LED" },{value:"252", word:"Traitement de l’Obésité abdominale par REDUSTIM" },{value:"253", word:"Comblement des Rides" },{value:"254", word:"Cellulite" },{value:"255", word:"Epilation définitive au LASER" },{value:"256", word:"Sclérose des varices" },{value:"257", word:"Goitre" },{value:"258", word:"Retard de croissance" },{value:"259", word:"Troubles Hormonaux" },{value:"260", word:"Dyslipidémie" },{value:"261", word:"Echographie Thyroïdienne" },{value:"263", word:"maladies de l'estomac" },{value:"264", word:"Consultations spécialisées de l'intestin" },{value:"265", word:"Consultations du foie" },{value:"266", word:"Problèmes proctologiques" },{value:"267", word:"hémorroïdes" },{value:"268", word:"fissures" },{value:"269", word:"Urgences médicales digestives" },{value:"270", word:"Fibroscopie" },{value:"271", word:"examen de la région anale" },{value:"272", word:"examen du bas intestin" },{value:"273", word:"Coloscopie" },{value:"274", word:"Rectoscopie" },{value:"275", word:"endoscopie totale du colon" },{value:"276", word:"endoscopie de l'estomac" },{value:"277", word:"Echographie abdominale" },{value:"278", word:"Ligature des hemorroides" },{value:"279", word:"Consultations d'Hépato-Gastro-Entérologie" },{value:"280", word:"Consultations de Proctologie" },{value:"281", word:"Gastrocopie" },{value:"282", word:"Resection de Polypes" },{value:"283", word:"Explorations Fonctionnelles Manométrie oesophagienne et Anorectale" },{value:"284", word:"Maladies du Foie" },{value:"285", word:"Maladies du Tube Digestif" },{value:"286", word:"procréation médicalement assistée PMA" },{value:"287", word:"Insémination" },{value:"288", word:"la Fécondation In Vitro FIV" },{value:"289", word:"Procréation Médicalement assistée FIV ICSI Insémination" },{value:"290", word:"Chirurgie Gynécologique" },{value:"291", word:"Coelioscopie" },{value:"292", word:"Hystéroscopie" },{value:"293", word:"Suivi de grossesse" },{value:"294", word:"Sénologie" },{value:"295", word:"Accouchement Césarienne" },{value:"296", word:"Gynécologie" },{value:"297", word:"Echographie 3D" },{value:"298", word:"Echographie 4D" },{value:"299", word:"Colposcopie" },{value:"300", word:"Stérilité" },{value:"301", word:"Echographie 2D" },{value:"302", word:"Stérilité de couple" },{value:"303", word:"Accouchement" },{value:"304", word:"Contraception" },{value:"305", word:"Spécialiste en Gynéco-Obstétrique" },{value:"306", word:"Frottis" },{value:"307", word:"Accouchement en clinique" },{value:"308", word:"Maladies des seins" },{value:"309", word:"Rythme cardiaque foetal ERCF" },{value:"310", word:"Morphogramme" },{value:"311", word:"Echographie Doppler" },{value:"313", word:"Obstétrique" },{value:"314", word:"Césarienne" },{value:"315", word:"Les frottis cervico-vaginaux FCV" },{value:"316", word:"Chirurgie de sein" },{value:"317", word:"Gynéco-Obstétrique" },{value:"318", word:"Stérilité insémination" },{value:"319", word:"Rééducation Fonctionnelle" },{value:"320", word:"Pathologie Orthopédiques" },{value:"321", word:"Kinésithérapie Respiratoire" },{value:"322", word:"Médecine Physique" },{value:"324", word:"Neurologie" },{value:"325", word:"Massage" },{value:"326", word:"Cupping Thérapie Hidjama" },{value:"327", word:"Médecine du Sport" },{value:"328", word:"Orthopédiques" },{value:"329", word:"Rééducation des Affections" },{value:"330", word:"Pédiatriques Congénitales" },{value:"331", word:"Gymnastique Médicale" },{value:"332", word:"Tests immunologiques" },{value:"333", word:"Analyses de fertilité" },{value:"334", word:"Tests répétés d'avortement" },{value:"335", word:"Consultation specialisee de médecine" },{value:"336", word:"Consultation spécialisée de traumatologie du sport" },{value:"337", word:"Visite médicale d'aptitude au sport" },{value:"338", word:"Physiothérapie" },{value:"339", word:"Kinésithérapie" },{value:"341", word:"Médecine générale" },{value:"342", word:"Mésothérapie" },{value:"343", word:"Soins esthétique médicalisés" },{value:"344", word:"Nutrition et régimes-Cupping thérapie HIDJAMA" },{value:"345", word:"Thérapie par l'énergie" },{value:"347", word:"sillon  à L’acide hyaluronique" },{value:"348", word:"Restauration des volumes du visage à l’acide hyaluronique" },{value:"349", word:"Traitement de l’alopécie chute de cheveux" },
   {value:"350", word:"Toxine botulique" },{value:"351", word:"Mesolift du visage" },{value:"352", word:"Mesolift du cou" },{value:"354", word:"Epilation permanente au Laser" },{value:"355", word:"Nutrition" },{value:"356", word:"Régime" },{value:"357", word:"Mésolift" },{value:"358", word:"Traitement de tout type de Cicatrices" },{value:"359", word:"Conseils diététiques" },{value:"360", word:"Blépharoplastie non Chirurgicale" },{value:"361", word:"Traitement de l'incontinence Urinaire" },{value:"362", word:"Traitement de l'idu relâchement pelvien" },{value:"363", word:"INJECTIONS POUR LE RAJEUNISSEMENT" },{value:"364", word:"Epilation au LASER SANS DOULEURS" },{value:"365", word:"traitement de l'arthrose" },{value:"366", word:"Traitement des traumatismes sportifs" },{value:"367", word:"prévention des effets secondaires de la radiothérapie" },{value:"368", word:"Prévention des effets secondaires  de la chimiothérapie" },{value:"369", word:"Prévention des complications du diabète pied diabétique" },{value:"370", word:"Prévention des complications du diabète pied gangrène" },{value:"371", word:"Lipolyse" },{value:"372", word:"Drainage" },{value:"373", word:"Diabète" },{value:"374", word:"Cavitation" },{value:"375", word:"Radiofréquence" },{value:"376", word:"Massage Vaccum" },{value:"379", word:"Soins du visage" },{value:"380", word:"Médecine générale" },{value:"381", word:"ACUPUNCTURE" },{value:"382", word:"Traitement des Rides" },{value:"383", word:"Traitement de l'acné" },{value:"384", word:"Lifting des paupières" },{value:"385", word:"Suppression des cicatrices d'acné" },{value:"386", word:"Suppression de verrues" },{value:"387", word:"Suppression de Naévus" },{value:"388", word:"Suppression  Vérgétures" },{value:"389", word:"Remodelage volumétrique du visage" },{value:"390", word:"Biorevitalisation visage cou décolleté" },{value:"391", word:"Prévention Anti-âge par PRP" },{value:"393", word:"Mésothérapie amincissante" },{value:"394", word:"Epilation définitive" },{value:"395", word:"Lipocavitation" },{value:"396", word:"ACCUPUNCTURE classique" },{value:"397", word:"ACCUPUNCTURE au Laser" },{value:"398", word:"MOXIBUSTON classique" },{value:"399", word:"MOXIBUSTION moderne" },{value:"400", word:"DÉPILATION LASER" },{value:"402", word:"RELACHEMENT CUTANÉ" },{value:"403", word:"Mesolift" },{value:"404", word:"cicatrice" },{value:"405", word:"DIÉTÉTIQUE" },{value:"406", word:"Traitement de l'Allergie" },{value:"407", word:"Traitement des taches brunes" },{value:"408", word:"Vergetures récentes" },{value:"409", word:"Vergetures anciennes" },{value:"410", word:"Relâchement cutané" },{value:"412", word:"Traitement des douleurs articulaires" },{value:"413", word:"Traitement de l'anxiété avec mésothérapie" },{value:"414", word:"Cernes" },{value:"415", word:"Lifting Médical" },{value:"416", word:"Dermabrasion" },{value:"417", word:"Laser" },{value:"418", word:"BLEPHAROPLASTIE NON CHIRUGICALE" },{value:"419", word:"Xanthélasma" },{value:"420", word:"TRAITEMENT DE L’HYPER-SUDATION" },{value:"421", word:"Ionophorese" },{value:"422", word:"SCLEROTHERAPIE" },{value:"423", word:"TRAITEMENT DE L'ALOPECIE" },{value:"424", word:"REMODELAGE DU CORPS" },{value:"425", word:"Massage visage" },{value:"426", word:"Massage corps" },{value:"427", word:"Enveloppement chauffant" },{value:"428", word:"Pressothérapie" },{value:"429", word:"Photo Rajeunissement" },{value:"430", word:"RELACHEMENT VISAGE" },{value:"433", word:"Les Régimes Alimentaires" },{value:"434", word:"Fils Tenseur" },{value:"435", word:"Présothérapie" },{value:"436", word:"Mesomasque" },{value:"437", word:"Prise en charge des diabétiques" },{value:"438", word:"Prise en charge les personnes âgées" },{value:"439", word:"Échographie abdomino-pelvienne" },{value:"440", word:"Traitement Des Plaies du pied diabétique" },{value:"441", word:"L'arthrose par Méso" },{value:"442", word:"tâches du visage" },{value:"443", word:"Médecine Esthétique Anti-Âge" },{value:"444", word:"Morphonutrition" },{value:"445", word:"Médecine Générale ADULTES ENFANTS." },{value:"446", word:"consultation a domicile" },{value:"447", word:"esthétique des cicatrices" },{value:"448", word:"Frottis cervico-uterin" },{value:"449", word:"Électrocardiogramme ECG" },{value:"451", word:"Soins généraux" },{value:"452", word:"Traumatique pré" },{value:"453", word:"post chirurgicales" },{value:"455", word:"Colopathie" },{value:"456", word:"Méso-Vaccination" },{value:"457", word:"Rhinite" },{value:"458", word:"Mésothérapie Infectieuse" },{value:"459", word:"Mésothérapie Bucco-dentaire" },{value:"460", word:"Mésothérapie Varices" },{value:"461", word:"Mésothérapie visage" },{value:"462", word:"Ventouses cosmétiques pour le visage" },{value:"463", word:"Maladies cardiaques" },{value:"464", word:"Hypertension Artérielle" },{value:"465", word:"Maladies Respiratoire" },{value:"466", word:"Maladies Asthme" },{value:"467", word:"Vidéo Fibroscopie" },{value:"468", word:"Vidéo Recto" },{value:"469", word:"Vidéo Coloscopie" },{value:"470", word:"Diabétologie" },{value:"471", word:"Hématologie" },{value:"472", word:"Maladies Cardiovasculaires" },{value:"473", word:"Gastro" },{value:"474", word:"intestinales" },{value:"475", word:"Fibroscopie OGD" },{value:"476", word:"Systémiques" },{value:"477", word:"Maladies Inflammatoire" },{value:"478", word:"Médecine Interne" },{value:"479", word:"Cardiologie" },{value:"480", word:"Echographie Cardiaque" },{value:"481", word:"Anémie" },{value:"482", word:"Fibroscopie digestive" },{value:"483", word:"pathologies Rénales" },{value:"484", word:"Pathologie Rénale liée au Diabète" },{value:"485", word:"Consultation en Néphrologie" },{value:"486", word:"maladie rénale" },{value:"487", word:"calculs rénaux" },{value:"488", word:"Néphropathie diabétique" },{value:"489", word:"insuffisance rénale" },{value:"490", word:"patients suivis en dialyse" },{value:"491", word:"imagerie rénale" },{value:"492", word:"Prise de tension" },{value:"493", word:"Prise de poids" },{value:"494", word:"Prise de taille" },{value:"495", word:"Consultation medicale" },{value:"496", word:"Echographie renale" },{value:"497", word:"Chimie des urines sur place" }
   ,{value:"498", word:"Traumatismes du Crane" },{value:"499", word:"Traumatismes du Rachis" },{value:"500", word:"chirurgie de la téte" },{value:"501", word:"chirurgie de la colonne vertébrale" },{value:"502", word:"chirurgie de des Nerfs" },{value:"503", word:"canal Carpien" },{value:"504", word:"Chirurgie du cerveau" },{value:"505", word:"Chirurgie moelle épinière" },{value:"506", word:"Spina bifida" },{value:"507", word:"Hydrocéphalie" },{value:"508", word:"Epilepsie" },{value:"509", word:"Maladie du Parkinson" },{value:"510", word:"Alzheimer" },{value:"511", word:"AVC" },{value:"512", word:"Maladies des Muscles" },{value:"513", word:"Électroencéphalogramme EEG" },{value:"514", word:"Consultation neurologique" },{value:"515", word:"Electromyogramme EMG" },{value:"516", word:"Potentiels évoqués visuels PEV" },{value:"517", word:"Potentiels évoqués somesthésiques PES" },{value:"518", word:"Potentiel évoqué auditif PEA" },{value:"519", word:"PME épilepsie myoclonique progressive " },{value:"520", word:"Exploraion Neuro Physiologique" },{value:"521", word:"Céphalées" },{value:"522", word:"Vertiges" },{value:"523", word:"Cervicalgies" },{value:"524", word:"Sciatalgies" },{value:"525", word:"Troubles de Sommeil" },{value:"526", word:"Douleur Neuropathie" },{value:"527", word:"Accidents Vasculaire Cérébraux" },{value:"528", word:"DÉMENCE" },{value:"529", word:"Les Hémiplégie dues à l’hypertension artérielle" },{value:"530", word:"Les Hémiplégie dues à les tumeurs cérébrales" },{value:"531", word:"Les mouvements anormaux" },{value:"532", word:"Les Aphasies" },{value:"533", word:"Les Acouphènes" },{value:"534", word:"potentiels évoqués myogéniques PEM" },{value:"535", word:"Traitement des Fourmillements" },{value:"536", word:"Les Entérocoques résistants aux Glycopeptides ERG" },{value:"537", word:"Neuropsychiatrie" },{value:"538", word:"Psychothérapie" },{value:"539", word:"Relaxation thérapeutique" },{value:"540", word:"Troubles psychologiques" },{value:"541", word:"Psychiatriques" },{value:"542", word:"Neurologiques" },{value:"543", word:"anxiété" },{value:"544", word:"dépression nerveuse" },{value:"545", word:"troubles bipolaires" },{value:"546", word:"troubles psychiatriques" },{value:"547", word:"Bilan nutritionnel" },{value:"548", word:"traitement des maladies chroniques" },{value:"549", word:"Maladie auto-immunes" },{value:"551", word:"Changements de pansements" },{value:"552", word:"injections" },{value:"553", word:"Aérosols crise d'Asthme" },{value:"554", word:"Auriculothérapie" },{value:"555", word:"Acupuncture Auriculaire Oreille" },{value:"556", word:"Douleurs arthrosiques" },{value:"557", word:"Souffrance psychologiques" },{value:"558", word:"Amincissement" },{value:"559", word:"Conseil nutrition" },{value:"560", word:"Lipocavitation" },{value:"561", word:"Amaigrissement" },{value:"562", word:"Taches" },{value:"563", word:"Ridé" },{value:"564", word:"cernes chute cheveux" },{value:"565", word:"DENSITOMETRIE  OSSEUSE  DMO" },{value:"566", word:"PODOLOGIE" },{value:"568", word:"Chirurgie de l'oreille" },{value:"569", word:"Chirurgie de Nez" },{value:"570", word:"Nasofibroscopie" },{value:"571", word:"mpédancemétrie" },{value:"572", word:"Chirurgie Cervico-Faciale" },{value:"573", word:"Audiométrie-Impédancemétrie" },{value:"574", word:"Consultation Spécialisée en Oto-Rhino-Laryndologie ORL" },{value:"575", word:"Epreuve Calorique" },{value:"576", word:"Amygdalectomie" },{value:"577", word:"Ablation des Végétations adenoides NEZ" },{value:"578", word:"Consultations" },{value:"579", word:"Lavage des oreilles" },{value:"580", word:"Audiogramme" },{value:"581", word:"Chirurgie ORL" },{value:"582", word:"Contactologie" },{value:"583", word:"Exploration" },{value:"584", word:"CHIRURGIE" },{value:"585", word:"Champ visuel automatisé" },{value:"586", word:"Angiographie rétinienne" },{value:"587", word:"Echographie oculaire" },{value:"588", word:"Explorations Biométrie" },{value:"589", word:"Explorations calcul d'implant" },{value:"590", word:"Auto réfractomètre pédiatrique" },{value:"591", word:"Chirurgie Cataracte par phacoémulsification" },{value:"592", word:"Chirurgie Strabisme" },{value:"593", word:"Chirurgie Voies lacrymales" },{value:"594", word:"Chirurgie Paupières" },{value:"595", word:"Chirurgie Glaucome" },{value:"596", word:"Chirurgie Cataracte par implantation" },{value:"597", word:"Phacoémulsification Micro chirurgie des yeux" },{value:"598", word:"Echographie mode A" },{value:"599", word:"Echographie mode B" },{value:"600", word:"Traitement par Laser Argon" },{value:"601", word:"Traitement par Laser Nd-YAG" },{value:"602", word:"Champ visuel Octopus" },{value:"603", word:"Pachymétrie" },{value:"604", word:"Auto-Réfracto-Kératométre Portable Handy Ref-K" },{value:"605", word:"Consultation d'Ophtalmologie" },{value:"606", word:"EXPLORATION Angio-OCT" },{value:"607", word:"Exploration Angiographie" },{value:"608", word:"Topographie cornien" },{value:"609", word:"Rétinographe non mydriatique portatif" },{value:"610", word:"Frontophotométre" },{value:"611", word:"Chirurgie OCULAIRE" },{value:"612", word:"Chirurgie Cataracte" },{value:"613", word:"Neuro-dégénératifs" },{value:"614", word:"Auditifs" },{value:"615", word:"Troubles d'apprentissages" },{value:"616", word:"Retard de Language" },{value:"617", word:"Pédiatrie" },{value:"618", word:"Néonatologie" },{value:"619", word:"Tests Cutanés" },{value:"620", word:"Pédiatrie Générale de 0 à 18 ans" },{value:"621", word:"Pneumo-allergologie pédiatrique" },{value:"622", word:"Test Cutané EFR Exploration Fonctionnelle Respiratoire" },{value:"623", word:"Vaccination" },{value:"624", word:"Pédiatrie Générale" },{value:"625", word:"Suivi des prématuré" },{value:"626", word:"Suivi des retard de croissance" },{value:"627", word:"Diabète chez l'enfant" },{value:"628", word:"Aerosol" },{value:"629", word:"Maladies des Enfants" },{value:"630", word:"Allergologie Infantile" },{value:"631", word:"Consultations Pédiatriques" },{value:"632", word:"Nutrition Infantile" },{value:"633", word:"Réparation Prothèse Résine à jonction d'une ou plusieurs dents" },{value:"634", word:"montage Bridge Habillage" },{value:"635", word:"Démontage Bridge Habillage" },{value:"636", word:"Réparation Bridge Habillage" },{value:"637", word:"Confection d'une prothèse totale Haut" },{value:"639", word:"Confection d'une prothèse totale Haut en résine" },{value:"640", word:"Confection d'une prothèse Stelitte" },{value:"641", word:"Psychométrie" },{value:"642", word:"Psychométrie Quotient Intellectuel" },{value:"643", word:"Psychométrie tests de Personnalité" },{value:"644", word:"Thematic Apperception Test TAT" },{value:"645", word:"Onde de choc" },{value:"646", word:"Pathologie Rhumatologiques" },{value:"647", word:"Mal de Dos" },{value:"648", word:"Cyphose" },{value:"649", word:"Pathologie Neurologiques" },{value:"650", word:"Pathologie  URINAIRE" }
   ,{value:"651", word:"Pathologie Respiratoires" },{value:"652", word:"Pathologie Congénitales" },{value:"653", word:"Appareillage Médical" },{value:"654", word:"Remise en Forme" },{value:"655", word:"Paraffine" },{value:"656", word:"Electrothérapie" },{value:"657", word:"Rééducation en Rhumatologie" },{value:"658", word:"Douleur du dos" },{value:"659", word:"Rééducation Neurologique" },{value:"661", word:"Hémiplégie" },{value:"662", word:"Paralysie Faciale périphérique" },{value:"663", word:"paralysie des Nerfs" },{value:"664", word:"Ergothérapie" },{value:"665", word:"Mécanothérapie" },{value:"666", word:"Massage manuels" },{value:"667", word:"Massage Instrumentales" },{value:"668", word:"Chaleur Infrarouge" },{value:"669", word:"Electrothérapie" },{value:"670", word:"Arthromoteur" },{value:"671", word:"Gymnastique en groupe" },{value:"672", word:"Préssothérapie" },{value:"673", word:"Echographie Masculaire" },{value:"674", word:"Polyarthrite" },{value:"675", word:"Tendinites" },{value:"676", word:"Torticolis" },{value:"677", word:"Goutte" },{value:"678", word:"Lupus" },{value:"679", word:"Ostéoporose" },{value:"680", word:"Conal Corpien" },{value:"681", word:"Polyarthrite Rhumatoïde" },{value:"682", word:"Ponction" },{value:"683", word:"Traitement de Lombosciatique" },{value:"684", word:"Maladies Rhumatismales Inflammatoires" },{value:"685", word:"Infiltration Echo-guidé" },{value:"686", word:"Diagnostic" },{value:"687", word:"Consultation de Sénologie" },{value:"688", word:"Echographie mammaire" },{value:"689", word:"Cytoponction écho guidée" },{value:"690", word:"Etude Anapath" },{value:"691", word:"Service d'Ambulance" },{value:"692", word:"Soins à l'étranger" },{value:"693", word:"Soins médicaux et paramédicaux"},{value:"3",word:"Bilan biologique"},{value:"3",word:"Perfusions Sérum"},{value:"3",word:"Sondage vésical"}
   ,{value:"3",word:"Location de Matériel Médical"},{value:"3",word:"Garde malade"},{value:"3",word:"Concentrateurs d’oxygène"},{value:"3",word:"Ambulance avec couveuse pour bébés"}]
   
   let TheWords = services.map(a => a.word.toLowerCase());

   //console.log('the words : '+  TheWords)
   let TheValues = services.map(a => a.value);
//app.post('/', (req, res) => processWebhook( req, res ));
var countser = 0;
var servicesEng = [{value: "0", word: "Service"}, {value: "1", word: "DFO"},{value: "1", word: "Orthodontics"},{value: "1", word: "dento-facial orthopedics"}, {value: "2", word: "Dental Extraction"},{value: "3", word: "General consultations"}, {value: "4", word: "HIDJAMA cupping therapy"}, {value: "5", word: "Hidjama Esthétique"}, {value : "6", word: "Home care"}, {value: "7", word: "Nursing"}, {value: "8", word: "Pain treatment"}, {value: "9 ", word:" Rheumatism "}, {value:" 11 ", word:" Sciatica "}, {value:" 12 ", word:" Sprain "}, {value:" 13 ", word:" Tendinitis "} , {value: "14", word: "Stress"}, {value: "15", word: "Overweight"}, {value: "16", word: "Obesity"}, {value: "17", word: "Migraine"}, {value: "18", word: "Facial paralysis"}, {value: "19", word: "Vomiting of pregnancy"}, {value: "20", word: "Sinusitis "}, {value:" 21 ", word:" Allergies "}, {value:" 23 ", word:" Medical analyzes "}, {value:" 24 ", word:" Advice "}, {value:" 25 ", word:" Business Services "}, {value:" 26 ", word:" Medical Tourism "}, {value:" 29 ", word:" VSL "}, {value:" 30 ", word: "Tone audiometry"}, {value: "32", word: "Vocal audiometry"}, {value: "33", word: "Behavioral audiometry"}, {value: "34 ", word:" Hearing aid "}, {value:" 35 ", word:" Noise stop confection "}, {value:" 36 ", word:" Stop plug confection "}, {value:" 37 " , word: "Screening test"}, {value: "38", word: "Audiometry"}, {value: "39", word: "Digital hearing aid"}, {value: "40", word: " Confection d'Embout "}, {value:" 41 ", word:" Confection de Bouchon de piscine "}, {value:" 44 ", word:" Psychomotricité "}, {value:" 45 ", word:" Speech therapy "}, {value:" 46 ", word:" Psychology "}, {value:" 47 ", word:" Cardiac Echodoppler "}, {value:" 48 ", word:" Vascular Echodoppler "}, {value: "49", word: "Holter Tensionnel MAPA"}, {value: "50", word: "Holter ECG"}, {value: "51", word: "Cardiac color Doppler ultrasound"}, {value: "52 ", word:" Trans esophageal echography "}, {value:" 53 ", word:" Vascular Doppler Ultrasound "}, {value:" 54 ", word:" Exercise test "}, {value:" 55 ", word:" Pediatric cardiologist "}, {value:" 56 ", word:" Interventional cardiologist "}, {value:" 57 ", word:" Stress echocardiography "}, { value: "58", word: "Holter"}, {value: "59", word: "Specialized Consultations"}, {value: "60", word: "Echocardiography"}, {value: "61", word : "Coronarographie"}, {value: "62", word: "Mammographie"}, {value: "63", word: "Panoramique Dentaire"}, {value: "64", word: "Echographie"}, { value: "65", word: "Digital Radiology"}, {value: "66", word: "Color Doppler Ultrasound"}, {value: "67", word: "Conventional radiologist"}, {value: "68 ", word:" Digital dental "}, {value:" 69 ", word:" HYSTEROSALPINGOGRAPHIE "}, {value:" 70 ", word:" DIGITAL MAMMOGRAPHY "}, {value:" 71 ", word:" ECHOGRAPHY GENERAL "}, {value:" 72 ", word:" Skin tumors of the face "}, {value:" 73 ", word:" Lifting Cervico Facial "},
{value: "74", word: "Liposucion"}, {value: "75", word: "Filling of Deep Wrinkles"}, {value: "76", word: "Labiovelo-Platinum Slots"}, {value : "77", word: "Dysmorphoses Angiomes"}, {value: "78", word: "Eyelid surgery"}, {value: "79", word: "Detached ears"}, {value: "80" , word: "Fracture of the Bones of the Face"}, {value: "81", word: "Wounds and Burns of the Face"}, {value: "82", word: "Sinus Surgery"}, {value : "83", word: "Neck surgery"}, {value: "84", word: "Rejuvenation surgery"}, {value: "85", word: "Rejuvenation medicine"}, {value: "86", word:" Tumors: Cutaneous, intraoral and neck "}, {value:"87", word:" Facial Dysmorphoses "}, {value:"88", word:" Cosmetic Surgery of the face"}, {value: "89", word: "Scar surgery"}, {value: "90", word: "Congenital anomalies"}, {value: "91", word: "Reconstructive surgery of the face"}, { value: "92", word: "Skin cancer"}, {value: "93", word: "Dermatological Surgery"}, {value: "94", word: "Face cancer"}, {value : "95", word: "Surgery of the oral cavity"}, {value: "96", word: "Surgery of the temporomandibular joint"}, {value: "97", word: "Pathologies of the glands salivares "}, {value:" 98 ", word:" Pre-implant surgery "}, {value:" 99 ", word:" Face trauma "}, {value:" 100 ", word:" Acid injection Hyoluronic "}, {value:" 101 ", word:" Botox "}, {value:" 102 ", word:" circumcisions "}, {value:" 103 ", word:" Sebaceous cysts "}, {value: "104", word: "Ingrown nails"}, {value: "105", word: "Surgical procedures"}, {value: "106", word: "UV Dental Care"}, {value: "107" , word: "Dental Extraction 2"}, {value: "108", word: "Teeth Whitening"}, {value: "109", word: "Descaling"}, {value: "110", word: "Prosthesis Fixed "}, {value:" 111 ", word:" Removable prostheses "}, {value:" 112 ", word:" Small Surgery "}, {value:" 113 ", word:" Ultrasonic scaling "}, {value: "114", word: "Mobile prostheses"}, {value: "115", word: "Flexible prostheses"}, {value: "116", word: "Dental care"}, {value: "117 ", word : "Esthétique Dentaire"}, {value: "118", word: "Ceramic Veneers"}, {value: "119", word: "Dental prostheses"}, {value: "120", word: "Implantology"} , {value: "121", word: "prosthesis"}, {value: "122", word: "Dental Surgery"}, {value: "123", word: "Ultrasonic scaling"}, {value : "124", word: "Implants"}, {value: "125", word: "Ceramic Prosthesis"}, {value: "126", word: "Ceramic"}, {value: "127", word: "Mobile Prosthesis"}, {value: "128", word: "Fixed ODF"}, {value: "129", word: "Removable ODF"}, {value: "130", word: "Ceramic Veneers"} , {value: "131", word: "Ceramic Care"}, {value: "132", word: "Oral Surgery"}, {value: "134", word: "Dental Veneers"}, {value: " 135 ", word:" Invisible Orthodontics by Aligners "}, {value:" 136 ", word:" Zirconia ceramic "}, {value:" 137 ", word:" Facets "}, {value:" 138 ", word : "ODF mobile"}, {value: "139", word: "Radio à Vision Directe"}, {value: "140", word: "Chirurgie"}, {value: "141", word: "Periodontal care "}, {value:" 142 ", word:" Implantology "},{value: "144", word: "Pediatric surgery"}, {value: "145", word: "Pediatric orthopedics"}, {value: "146", word: "Palliative surgery "}, {value:" 147 ", word:" Microsurgical Surgery "}, {value:" 148 ", word:" Orthopedic Surgery "}, {value:" 150 ", word:" Trauma Surgery "}, {value: "151", word: "Hand Surgery"}, {value: "152", word: "Surgery of the Peripheral Nerves"}, {value: "153", word: "Surgery of the Brachial Plexus"} , {value: "154", word: "Bone Diseases"}, {value: "155", word: "Joint Diseases"}, {value: "156", word: "Sports Trauma"}, {value : "157", word: "Trauma Emergencies"}, {value: "158", word: "Orthopedic Pathologies"}, {value: "159", word: "Infiltrations"}, {value: "160", word : "URGENCES TRAUMATOLOGIE"}, {value: "161", word: "Surgery of the brachial plexus 2"}, {value: "162", word: "Prosthetic Surgery 3"}, {value: "163", word: " Spine surgery "}, {value:"164", word:"Knee surgery"}, {value:" 165 ", word:" Arthrosis surgery copy "}, {value:" 166 ", word:" Joint diseases "}, {value:" 167 ", word:" Rheumatic diseases "}, {value:"168", word:" Functional rehabilitation of orthopedic diseases "}, {value:"169", word:" Digital radiology "}, {value:" 170 ", word:" Obesity treatment "}, {value:" 171 ", word:" Celiac diseases "} , {value: "172", word: "Diabetes"}, {value: "173", word: "Specialist in Orthopedics"}, {value: "174", word: "Specialist in trauma"}, {value: "175", word: "Joint specialist"},
{value: "176", word: "Radiography"}, {value: "177", word: "Sports pathology"}, {value: "178", word: "Rheumatology"}, {value: "179", word: "Spine Surgery"}, {value: "180", word: "Prosthetic Surgery"}, {value: "181", word: "Child Surgery"}, {value: "182", word: "Osteoarthritis "}, {value:" 183 ", word:" Sciatica "}, {value:" 184 ", word:" Disc herniation "}, {value:" 185 ", word:" Scoliosis "}, {value:" 186 ", word:" Menisque "}, {value:" 187 ", word:" Laxitées "}, {value:" 188 ", word:" Traumatologie "}, {value:"189", word:" Prosthetic Surgery 2"}, {value:"190", word:" Arthroscopic surgery "}, {value:"191", word:" Management of fractures "}, {value:"192", word:" Orthopedics of the spine" }, {value: "193", word: "Diabetic Foot"}, {value: "194", word: "Osteo-articular ultrasound"}, {value: "195", word: "Treadmill Runtime Runtime Software" }, {value: "196", word: "3D Custom Orthopedic Insole VULCAN Machine." }, {value: "197", word: "Foot Surgery"}, {value: "198", word: "Electronic baropodometer exploration"}, {value: "199", word: "Podoscan 3D exploration"}, {value: "200", word: "Osteoarthritis Treatment"}, {value: "201", word: "Diabetes Hypertension"}, {value: "202", word: "Rheumatism ECG"}, {value: "203", word: "Medical Emergency"}, {value: "204", word: "Laparoscopic surgery"}, {value: "205", word: "Infertility"}, {value: "206", word: "Laparoscopic lithotripsy"}, {value: "207", word: "Urinary tract surgery"}, {value: "208", word: "Kidney surgery"}, {value: "209", word: "Prostate surgery" }, {value: "210", word: "Male sterility surgery"}, {value: "211", word: "Endoscopic surgery"}, {value: "212", word: "URETEROSCOPY surgery"}, {value : "214", word: "Bladder diseases"}, {value: "215", word: "Ureteroscopy with Laser"}, {value: "216", word: "Sexual impotence"}, {value: " 217 ", word:" Genitalia "}, {value:" 218 ", word:" Prostate biopsy "}, {value:" 219 ", word:" LASER DEPILATOIRE "}, {value: "220", word: "LASER REJUUNISSEMENT"}, {value: "221", word: "AESTHETIC SURGERY"}, {value: "222", word: "REPAIRING SURGERY"}, {value: "223 ", word:" CARBOXYTHERAPIE "}, {value:" 224 ", word:" MESOTHERAPY "}, {value:" 225 ", word:" CICATRICES D'ACNÉ "}, {value:" 226 ", word:" PIGMENTED TASKS "}, {value:" 227 ", word:" hair "}, {value:" 228 ", word:" HAIR LOSS TREATMENT "}, {value:" 229 ", word:" Dermapen "}, {value: "230", word: "stretch marks"}, {value: "231", word: "Laser Dé-tattoo"}, {value: "232", word: "Dermatologie"}, {value: "233 ", word:" LASER Hair Removal "}, {value:" 234 ", word:" Aesthetic Lasers "}, {value:" 235 ", word:" Treatment of Diseases "}, {value:" 236 ", word: "Skin allergies"}, {value: "237", word: "Nail Diseases"}, {value: "238", word: "Skin cleansing"}, {value: "239", word : "Medical peels"},{value: "240", word: "Plasma therapy rich in PRP platelets"}, {value: "241", word: "Facial rejuvenation"}, {value: "242", word: "treatment of wrinkles and scars" }, {value: "243", word: "Skin diseases"}, {value: "244", word: "Scalp diseases"}, {value: "245", word: "Venereal diseases"} , {value: "246", word: "Cryotherapy"}, {value: "247", word: "Varicose Diseases"}, {value: "248", word: "Epilation Electrique"}, {value: "249 ", word:" Aesthetic Medicine "}, {value:" 250 ", word:" Fillings "}, {value:" 251 ", word:" LED treatment "}, {value:" 252 ", word:" Treatment of abdominal obesity by REDUSTIM "}, {value:" 253 ", word:" Filling wrinkles "}, {value:" 254 ", word:" Cellulite "}, {value:" 255 ", word: "LASER permanent hair removal"}, {value: "256", word: "Varicose vein sclerosis"}, {value: "257", word: "Goiter"}, {value: "258", word: "Delay growth "}, {value:" 259 ", word:" Hormonal Disorders"}, {value:"260", word:" Dyslipidemia "}, {value:"261", word:" Thyroid Ultrasound "} , {value: "263", word: "stomach diseases"}, {value: "264", word: "Specialized bowel consultations"}, {value: "265", word: "Consultations du liver "}, {value:" 266 ", word:" Proctological problems "}, {value:" 267 ", word:" hemorrhoids "}, {value:" 268 ", word:" cracks "}, {value: "269", word: "Medical digestive emergencies"}, {value: "270", word: "Fibroscopy"}, {value: "271", word: "examination of the anal region"}, {value: "272 ", word:" examination of the lower intestine "}, {value:" 273 ", word:" Colonoscopy "}, {value:" 274 ", word:" Rectoscopy "}, {value:" 275 ", word:" total colon endoscopy "}, {value:" 276 ", word:" stomach endoscopy "}, {value:" 277 ", word:" Abdominal ultrasound "}, {value:" 278 ", word:" Hemorrhoids ligature "}, {value:" 279 ", word:" Hepato-Gastro-Enterology Consultations "}, {value:" 280 ", word:" Proctology Consultations "}, {value:" 281 ", word: "Gastrocopie"}, {value: "282", word: "Resection of Polyps"}, {value: "283", word: "Functional Explorations Esophageal Manometry and Anore ctale "}, {value:" 284 ", word:" Liver Diseases "}, {value:" 285 ", word:" Digestive Tube Diseases "}, {value:" 286 ", word:" medically assisted procreation PMA "}, {value:" 287 ", word:" Insemination "}, {value:" 288 ", word:" In Vitro IVF Fertilization "}, {value:" 289 ", word:" Medically assisted procreation IVF ICSI Insemination "}, {value:" 290 ", word:" Gynecological Surgery "}, {value:" 291 ", word:" Coelioscopy "}, {value:" 292 ", word:" Hysteroscopy "}, {value : "293", word: "Pregnancy follow-up"}, {value: "294", word: "Senology"}, {value: "295", word: "Cesarean delivery"}, {value: "296", word: "Gynecology"}, {value: "297", word: "3D ultrasound"}, {value: "298", word: "4D ultrasound"}, {value: "299", word: "Colposcopie"} , {value: "300", word: "Sterility"}, {value: "301", word: "2D ultrasound"}, {value: "302", word: "Couple sterility"}, {value: " 303 ", word:" Childbirth "}, {value:" 304 ", word:" Contraception "}, {value:" 305 ", word:" Specialist in Gyneco-Obstetrics "}, {value:" 306 ", word :"Fr ottis "}, {value:" 307 ", word:" Childbirth in the clinic "}, {value:" 308 ", word:" Breast disease "}, {value:" 309 ", word:" Fetal heart rate ERCF "}, {value:" 310 ", word:" Morphogram "}, {value:" 311 ", word:" Doppler ultrasound "}, {value:" 313 ", word:" Obstetrics "}, {value:" 314 ", word:" Cesarean section "}, {value:" 315 ", word:" Cervico-vaginal smears FCV "}, {value:" 316 ", word:" Breast surgery "}, {value:" 317 ", word:" Gyneco-Obstetrics "}, {value:" 318 ", word:" Insemination sterility "}, {value:" 319 ", word:" Functional Reeducation "}, {value:" 320 ", word: "Orthopedic Pathology"}, {value: "321", word: "Respiratory Kinesitherapy"}, {value: "322", word: "Physical Medicine"}, {value: "324", word: "Neurology"}, {value: "325", word: "Massage"}, {value: "326", word: "Cupping Therapy Hidjama"}, {value: "327", word: "Sports Medicine"}, {value: " 328 ", word:" Orthopedics "}, {value:" 329 ", word:" Rehabilitation of Conditions "}, {value:" 330 ", word:" Congenital Pediatrics "}, {value:" 331 ", word: "Medical Gymnastics"}, {value: "332", word: "Immunological tests"}, {value: "333", word: "Fertility tests"}, {value: "334", word: "Tests repeated abortion "},
{value: "335", word: "Specialized medical consultation"}, {value: "336", word: "Specialized sports trauma consultation"}, {value: "337", word: "Medical examination of aptitude for sport "}, {value:" 338 ", word:" Physiotherapy "}, {value:" 339 ", word:" Kinesitherapy "}, {value:" 341 ", word:" General medicine "}, { value: "342", word: "Mesotherapy"}, {value: "343", word: "Aesthetic medical care"}, {value: "344", word: "Nutrition and diets Cupping therapy HIDJAMA"}, { value: "345", word: "Energy therapy"}, {value: "347", word: "groove with hyaluronic acid"}, {value: "348", word: "Restoration of the volumes of the face with hyaluronic acid "}, {value:"349", word:" Treatment of hair loss alopecia"},{value: "350", word: "Botulinum toxin"}, {value: "351", word: "Facial mesolift"}, {value: "352", word: "Neck mesolift"}, {value: "354", word: "Permanent laser hair removal"}, {value: "355", word: "Nutrition"}, {value: "356", word: "Diet"}, {value: "357", word : "Mésolift"}, {value: "358", word: "Treatment of all types of Scars"}, {value: "359", word: "Diet advice"}, {value: "360", word: " Non Surgical Blepharoplasty "}, {value:" 361 ", word:" Treatment of Urinary Incontinence "}, {value:" 362 ", word:" Treatment of pelvic relaxation idiom "}, {value:" 363 ", word:" INJECTIONS FOR REJUVENATION "}, {value:" 364 ", word:" LASER REMOVAL WITHOUT PAIN "}, {value:" 365 ", word:" treatment of osteoarthritis "}, {value : "366", word: "Treatment of sports injuries"}, {value: "367", word: "prevention of the side effects of radiotherapy"}, {value: "368", word: "Prevention of the side effects of chemotherapy "}, {value:" 369 ", word:" Prevention of diabetic complications te diabetic foot "}, {value:" 370 ", word:" Prevention of complications of diabetes gangrene foot "}, {value:" 371 ", word:" Lipolysis "}, {value:" 372 ", word:" Drainage "}, {value:" 373 ", word:" Diabetes "}, {value:" 374 ", word:" Cavitation "}, {value:" 375 ", word:" Radiofrequency "}, {value:" 376 ", word:" Massage Vaccum "}, {value:" 379 ", word:" Facial care "}, {value:" 380 ", word:" General medicine "}, {value:" 381 ", word : "ACUPUNCTURE"}, {value: "382", word: "Wrinkle Treatment"}, {value: "383", word: "Acne Treatment"}, {value: "384", word: " Eyelid lifting "}, {value:" 385 ", word:" Removal of acne scars "}, {value:" 386 ", word:" Removal of warts "}, {value:" 387 ", word: "Suppression of Naévus"}, {value: "388", word: "Suppression Vérgétures"}, {value: "389", word: "Volumetric reshaping of the face"}, {value: "390", word: "Biorevitalization face neck décolleté "}, {value:" 391 ", word:" Anti-aging prevention by PRP "}, {value:" 393 ", word:" Slimming mesotherapy "}, {value:" 394 " , word: "Permanent hair removal"}, {value: "395", word: "Lipocavitation"}, {value: "396", word: "classic ACCUPUNCTURE"}, {value: "397", word: "ACCUPUNCTURE on Laser "}, {value:" 398 ", word:" classic MOXIBUSTON "}, {value:" 399 ", word:" modern MOXIBUSTION "}, {value:" 400 ", word:" LASER DEPILATION "}, { value: "402", word: "RELACHEMENT CUTANÉ"}, {value: "403", word: "Mesolift"}, {value: "404", word: "cicatrice"}, {value: "405", word : "DIETETICS"}, {value: "406", word: "Treatment of Allergy"}, {value: "407", word: "Treatment of dark spots"}, {value: "408", word: "Recent stretch marks"}, {value: "409", word: "Old stretch marks"}, {value: "410", word: "Sagging skin"}, {value: "412", word: "Treatment of joint pain "}, {value:" 413 ", word:" Anxiety treatment with mesotherapy "}, {value:" 414 ", word:" Dark circles "}, {value:" 415 ", word:" Medical Lifting " }, {value: "416", word: "Dermabrasion"}, {value: "417", word: "Laser"}, {value: "418", word: "NON-SURGICAL BLEPHAROPLASTY"}, {value: "419", word: "Xanthelasma"}, {value: "420", word: "HYPER-SUDATION TREATMENT"}, {value: "421", word: "Ionophorese"}, {value: "422", word: "SCLEROTHERAPIE"}, {value: "423", word: "TREATMENT OF ALOPECIA"}, {value: "424", word: "BODY REMODELING"}, {value: "425", word: "Massage face "}, {value:" 426 ", word:" Body massage "}, {value:" 427 ", word:" Heating wrap "}, {value:" 428 ", word:" Pressotherapy "}, {value : "429", word: "Photo Rejuvenation"}, {value: "430", word: "RELACHEMENT VISAGE"}, {value: "433", word: "Les Régimes Alimentaires"}, {value: "434" , word: "Fils Tenseur"}, {value: "435", word: "Pre-therapy"}, {value: "436", word: "Mesomasque"}, {value: "437", word: "Support diabetics "}, {value:" 438 ", word:" Care for the elderly "}, {value:" 439 ", word:" Abdominopelvic ultrasound "}, {value:" 440 ", word: "Diabetic Foot Wound Treatment"}, {value: "441", word: "Osteoarthritis by Meso"}, {value: "442", word: "facial tasks"}, {value: "443" , word: "Medicine Es Anti-Aging "}, {value: "444", word: "Morphonutrition"},
{value: "445", word: "General Medicine ADULT CHILDREN." }, {value: "446", word: "home consultation"}, {value: "447", word: "aesthetic scars"}, {value: "448", word: "Cervical-uterine smear"} , {value: "449", word: "ECG electrocardiogram"}, {value: "451", word: "General care"}, {value: "452", word: "Pre traumatic"}, {value: " 453 ", word:" post surgical "}, {value:" 455 ", word:" Colopathy "}, {value:" 456 ", word:" Meso-Vaccination "}, {value:" 457 ", word: "Rhinitis"}, {value: "458", word: "Infectious Mesotherapy"}, {value: "459", word: "Oral Mesotherapy"}, {value: "460", word: "Varicose Mesotherapy" }, {value: "461", word: "Face mesotherapy"}, {value: "462", word: "Cosmetic suction cups for the face"}, {value: "463", word: "Heart disease"}, {value: "464", word: "Hypertension"}, {value: "465", word: "Respiratory Diseases"}, {value: "466", word: "Asthma Diseases"}, {value: "467 ", word:" Fibroscopy Video "}, {value:" 468 ", word:" Front Video "}, {value:" 469 ", word:" Video Colonoscopy "}, {value:" 470 ", word:" Diabetolo gie "}, {value:" 471 ", word:" Hematology "}, {value:" 472 ", word:" Cardiovascular Diseases "}, {value:" 473 ", word:" Gastro "}, {value: "474", word: "intestinal"}, {value: "475", word: "Fibroscopie OGD"}, {value: "476", word: "Systemic"}, {value: "477", word: " Inflammatory Diseases "}, {value:" 478 ", word:" Internal Medicine "}, {value:" 479 ", word:" Cardiology "}, {value:" 480 ", word:" Cardiac Ultrasound "}, { value: "481", word: "Anemia"}, {value: "482", word: "Digestive fibroscopy"}, {value: "483", word: "Kidney disease"}, {value: "484", word: "Renal Pathology linked to Diabetes"}, {value: "485", word: "Consultation in Nephrology"}, {value: "486", word: "renal disease"}, {value: "487", word : "kidney stones"}, {value: "488", word: "Diabetic nephropathy"}, {value: "489", word: "renal failure"}, {value: "490", word: "patients followed dialysis "}, {value:" 491 ", word:" kidney imagery "}, {value:" 492 ", word:" Tension gain "}, {value:" 493 ", word:" Weight gain "} , {value: "494", word: "Taking size "}, {value:" 495 ", word:" Medical consultation "}, {value:" 496 ", word:" Renal ultrasound "}, {value:" 497 ", word:" Chemistry of urine on site " },{value: "498", word: "Trauma of the Skull"}, {value: "499", word: "Trauma of the spine"}, {value: "500", word: "head surgery"}, { value: "501", word: "spine surgery"}, {value: "502", word: "surgery of the nerves"}, {value: "503", word: "carpal tunnel"}, { value: "504", word: "Brain surgery"}, {value: "505", word: "Spinal cord surgery"}, {value: "506", word: "Spina bifida"}, {value: " 507 ", word:" Hydrocephalus "}, {value:" 508 ", word:" Epilepsy "}, {value:" 509 ", word:" Parkinson's disease "}, {value:" 510 ", word:" Alzheimer "}, {value:" 511 ", word:" AVC "}, {value:" 512 ", word:" Muscle diseases "}, {value:" 513 ", word:" EEG electroencephalogram "}, { value: "514", word: "Neurological consultation"}, {value: "515", word: "EMG electromyogram"}, {value: "516", word: "Visual evoked potentials PEV"}, {value: " 517 ", word:" Potential evoked somesthesic PES "}, {value:" 518 ", word:" Potential evoked auditory PEA "}, {value:" 519 ", word:" PME progressive myoclonus epilepsy "}, {value:" 520 " , word: "Explor aion Neuro Physiologique "}, {value:" 521 ", word:" Headache "}, {value:" 522 ", word:" Vertigo "}, {value:" 523 ", word:" Cervicalgies "}, {value : "524", word: "Sciatalgies"}, {value: "525", word: "Sleep disorders"}, {value: "526", word: "Pain Neuropathy"}, {value: "527", word: "Cerebrovascular Accidents"}, {value: "528", word: "DEMENTIA"}, {value: "529", word: "Hemiplegia due to high blood pressure"}, {value: "530" , word: "Hemiplegia due to brain tumors"}, {value: "531", word: "Abnormal movements"}, {value: "532", word: "Les Aphasies"}, {value: "533", word:" Les Acouphènes "}, {value:"534", word:" myogenic evoked potentials PEM "}, {value:"535", word:" Treatment of Tingles "}, {value:" 536 ", word: "Enterococci resistant to Glycopeptides ERG"}, {value: "537", word: "Neuropsychiatry"}, {value: "538", word: "Psychotherapy"}, {value: "539", word: " Therapeutic relaxation "}, {value:"540", word:" Psychological disorders "}, {value:" 541 ", word:" Psyc hiatrics "}, {value:" 542 ", word:" Neurological "}, {value:" 543 ", word:" anxiety "}, {value:" 544 ", word:" nervous breakdown "}, {value: "545", word: "bipolar disorder"}, {value: "546", word: "psychiatric disorder"}, {value: "547", word: "Nutritional assessment"}, {value: "548", word : "treatment of chronic diseases"}, {value: "549", word: "Autoimmune disease"}, {value: "551", word: "Dressing changes"}, {value: "552", word : "injections"}, {value: "553", word: "Aerosols for asthma attack"}, {value: "554", word: "Auriculotherapy"}, {value: "555", word: "Auricular acupuncture Ear "}, {value:" 556 ", word:" Arthrosis pain "}, {value:" 557 ", word:" Psychological suffering "}, {value:" 558 ", word:" Thinning "}, {value : "559", word: "Nutrition advice"}, {value: "560", word: "Lipocavitation"}, {value: "561", word: "Weight loss"}, {value: "562", word: "Spots"}, {value: "563", word: "Wrinkles"}, {value: "564", word: "dark hair circles"}, {value: "565", word: "BONE DENSITOMETRY DMO"} , {value: "5 66 ", word:" PODOLOGY "}, {value:" 568 ", word:" Ear surgery "}, {value:" 569 ", word:" Nose surgery "}, {value:" 570 " , word: "Nasofibroscopy"}, {value: "571", word: "mpédancemétrie"}, {value: "572", word: "Cervico-Facial Surgery"}, {value: "573", word: "Audiometry -Impédancemétrie "}, {value:" 574 ", word:" Specialized Consultation in Oto-Rhino-Laryndology ENT "}, {value:" 575 ", word:" Calorie test "}, {value:" 576 ", word : "Tonsillectomy"}, {value: "577", word: "Ablation of Vegetation adenoids NEZ"},
{value: "578", word: "Consultations"}, {value: "579", word: "Ear washing"}, {value: "580", word: "Audiogram"}, {value: "581" , word: "ENT Surgery"}, {value: "582", word: "Contactology"}, {value: "583", word: "Exploration"}, {value: "584", word: "SURGERY"} , {value: "585", word: "Automated visual field"}, {value: "586", word: "Retinal angiography"}, {value: "587", word: "Eye ultrasound"}, {value: "588", word: "Biometric Explorations"}, {value: "589", word: "Implant Calculations Exploration"}, {value: "590", word: "Pediatric Auto Refractometer"}, {value: "591", word:" Cataract surgery by phacoemulsification"}, {value:"592", word:" Surgery Strabismus"}, {value:" 593 ", word:" Surgery Tear ducts"}, {value:" 594" , word: "Eyelid surgery"}, {value: "595", word: "Glaucoma surgery"}, {value: "596", word: "Cataract surgery by implantation"}, {value: "597", word: "Phacoemulsification Micro eye surgery"}, {value: "598", word: "Echographie mode A"}, {value: "599", word: "Echograp hie mode B "}, {value:" 600 ", word:" Argon Laser Processing "}, {value:" 601 ", word:" Nd-YAG Laser Processing "}, {value:" 602 ", word : "Octopus visual field"}, {value: "603", word: "Pachymetry"}, {value: "604", word: "Auto-Réfracto-Kératométre Portable Handy Ref-K"}, {value: "605 ", word:" Consultation d'Ophtalmologie "}, {value:" 606 ", word:" EXPLORATION Angio-OCT "}, {value:" 607 ", word:" Exploration Angiographie "}, {value:" 608 " , word: "Topographie cornien"}, {value: "609", word: "Portable non-mydriatic retinograph"}, {value: "610", word: "Frontophotométre"}, {value: "611", word: " EYE SURGERY "}, {value:" 612 ", word:" Cataract Surgery "}, {value:" 613 ", word:" Neuro-degenerative "}, {value:" 614 ", word:" Hearing "}, {value: "615", word: "Learning disabilities"}, {value: "616", word: "Language delay"}, {value: "617", word: "Pediatrics"}, {value: "618", word: "Neonatology"}, {value: "619", word: "Skin Tests"}, {value: "620", word: "General Pediatrics from 0 to 18 years old"}, {value: " 621 ", word: "Pediatric pneumo-allergology"}, {value: "622", word: "Skin Test EFR Exploration Functional Respiratory"}, {value: "623", word: "Vaccination"}, {value: "624", word: "General Pediatrics"}, {value: "625", word: "Monitoring of premature babies"}, {value: "626", word: "Monitoring of stunting"}, {value: "627", word: " Diabetes in children "}, {value:" 628 ", word:" Aerosol "}, {value:" 629 ", word:" Children's Diseases "}, {value:" 630 ", word:" Child Allergology "}, {value:" 631 ", word:" Pediatric Consultations "}, {value:" 632 ", word:" Infantile Nutrition "}, {value:" 633 ", word:" Resin prosthesis repair at junction one or more teeth "}, {value:" 634 ", word:" Assembly Bridge Dressing "}, {value:" 635 ", word:" Dismantling Bridge Dressing "}, {value:" 636 ", word:" Repair Bridge Dressing "}, {value:" 637 ", word:" Confection of a high total prosthesis "}, {value:" 639 ", word:" Confection of a total prosthesis High in resin "}, {value: "640", word: "Making a Stelitte prosthesis"}, {value: "6 41 ", word:" Psychometry "}, {value:" 642 ", word:" Intelligence Quotient Psychometry "}, {value:" 643 ", word:" Psychometry Personality Tests "}, {value:" 644 ", word: "Thematic Apperception Test TAT"}, {value: "645", word: "Shock wave"}, {value: "646", word: "Rheumatic Pathology"}, {value: "647", word: "Backache"}, {value: "648", word: "Cyphosis"}, {value: "649", word: "Neurological Pathology"}, {value: "650", word: "URINARY Pathology"},{value: "651", word: "Respiratory Pathology"}, {value: "652", word: "Congenital Pathology"}, {value: "653", word: "Medical Equipment"}, {value: "654", word:"Remise en Forme"}, {value:"655", word:"Paraffin"}, {value:"656", word:"Electrotherapy"}, {value:"657", word:" Rehabilitation in Rheumatology "}, {value:"658", word:" Back pain "}, {value:"659", word:" Neurological rehabilitation "}, {value:"661", word:" Hemiplegia "}, {value: "662", word: "Peripheral facial paralysis"}, {value: "663", word: "paralysis of the nerves"}, {value: "664", word: "ergotherapy"}, {value: " 665 ", word:" Mechanotherapy "}, {value:"666", word:" Manual massage "}, {value:"667", word:" Massage Instrumental "}, {value:" 668 ", word:" Infrared Heat "}, {value:" 669 ", word:" Electrotherapy "}, {value:" 670 ", word:" Arthromoteur "}, {value:" 671 ", word:" Group gymnastics "}, { value: "672", word: "Presotherapy"}, {value: "673", word: "Muscle Ultrasound"}, {value: "674", word: "Polyarthritis"}, {value: "675", word : "Tend inites "}, {value:" 676 ", word:" Torticolis "}, {value:" 677 ", word:" Goutte "}, {value:" 678 ", word:" Lupus "}, {value:" 679 ", word:" Osteoporosis "}, {value:" 680 ", word:" Conal Corpien "}, {value:" 681 ", word:" Rheumatoid arthritis "}, {value:" 682 ", word:" Puncture "}, {value:" 683 ", word:" Lumboskeletal Treatment "}, {value:" 684 ", word:" Inflammatory Rheumatic Diseases "}, {value:" 685 ", word:" Echo-guided infiltration "}, {value:" 686 ", word:" Diagnosis "}, {value:" 687 ", word:" Senology consultation "}, {value:" 688 ", word:" Breast ultrasound "}, {value : "689", word: "Cytopunction guided echo"}, {value: "690", word: "Etude Anapath"}, {value: "691", word: "Ambulance Service"}, {value: " 692 ", word:" Care abroad "}, {value:" 693 ", word:" Medical and paramedical care "}, {value:" 3 ", word:" Biological assessment "}, {value:" 3 ", word:" Perfusions Sérum "}, {value:" 3 ", word:" Bladder catheterization "}];


let TheWordsEn = servicesEng.map(a => a.word.toLowerCase());


//app.listen(3000, () => console.log('App listening on port 3000!'));
var VarWiltemp = "";
var VarSpectemp = "";
app.post("/", function(req, res) {
try {
  

  var lang = req.body.queryResult.languageCode;
 
 
  switch (req.body.queryResult.intent.displayName) {
    case "echo":
      var speech = req.body.queryResult.queryText;

      // var speech =
      // req.body.queryResult &&
      // req.body.queryResult.parameters &&
      // req.body.queryResult.parameters.echoText
      //   ? req.body.queryResult.parameters.echoText
      //   : "Seems like some problem. Speak again.";
    
  
      break;
    case "getDoctor":
      var falsecounter = 0;
      var speech = req.body.queryResult.queryText;
      var ListSuggestions = [];
      var ListSuggestions2 = [];
      var listofRatSugesstion = [];
      var Respon = "Ok";
     
      var RawText = ""+req.body.queryResult.queryText;
      var texttosearch = RawText;

      var ElementQuery = RawText.split(" ");
      var WilayaOrig = req.body.queryResult.outputContexts[0].parameters["Wilaya.original"];

      console.log("Wilaya : "+ WilayaOrig)
    //  texttosearch = texttosearch.replace(WilayaOrig,"");
     // var tsstx = texttosearch.replace(WilayaOrig[0],"");
     // console.log("Second attemept : "+ tsstx)
     
      WilayaOrig.forEach(wl => {
          console.log("this is : "+ wl)
          texttosearch = texttosearch.replace(wl,"");
          console.log("Text to search : "+texttosearch)
      })
      
      var theSpecialty = ""+req.body.queryResult.outputContexts[0].parameters["Specialist.original"];
      console.log('the spec: '+ theSpecialty + " length : "+theSpecialty.length + " the wil : "+ WilayaOrig)
     
    //   <speak>
    //   Bonjour
    //   <audio src="https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg"/>
    //   Avec le SSML,
    //   <prosody rate="fast">vous pouvez accélérer l'élocution.</prosody>
    //   <prosody rate="slow">Ou la ralentir.</prosody>
    //   <prosody pitch="high">Vous pouvez la rendre plus aiguë.</prosody>
    //   <prosody pitch="low">Ou plus grave.</prosody>
    //   <prosody volume="loud">Augmenter son volume.</prosody>
    //   <prosody volume="soft">Ou le diminuer.</prosody>
    //   <prosody rate="fast" pitch="low" volume="x-loud">Ou les trois à la fois !</prosody>
    //   <break/>
    //   Mais en <say-as interpret-as="ordinal">1</say-as>,
    //   Vous pouvez me faire épeler des couleurs comme le bleu<break time="0.5s"/>
    //   <say-as interpret-as="characters">bleu</say-as>.
    //   Modifiez ceci pour essayer !
    // </speak>
          if(WilayaOrig[0]){
            if(WilayaOrig[0].length<=3){
              var WilayaOrig = req.body.queryResult.outputContexts[0].parameters["Wilaya"];
            }
          }
   
      console.log('Search from previous one : '+ VarWiltemp)
 
      if( (!WilayaOrig || WilayaOrig.length <1) && (theSpecialty || theSpecialty.length > 0 )){
       
          if(falsecounter <1){
            var Respeech ="";
            var searchword = "Cherchez"
    
            if(lang == "en"){
              searchword = "Help"
    
               Respeech  = "Which state do you want me to look into"
            }else{
              searchword = "Comment?"
    
               Respeech = "Dans Quelle wilaya vous voulez chercher ?"
            }
            var speechResponse = {
              google: {
                expectUserResponse: true,
                richResponse: {
                  items: [
                    {
                      simpleResponse: {
                        textToSpeech: Respeech
                      }
                    },
                  
                   
                   
                  ],
                
                  suggestions: [
                    {
                      "title": searchword
                    },
                    {
                      "title": "Cancel"
                    },
                  ]
          
                }
              }
            };
            falsecounter++;
            return res.json({
              payload: speechResponse,
              //data: speechResponse,
              fulfillmentText: speech,
              speech: speech,
              displayText: speech,
              source: "webhook-echo-sample"
            });
            
          
       
        }
       
 
      }
    

      if(theSpecialty && WilayaOrig){
        var  MatchobjWil;
        if(lang == "en"){

            MatchobjWil =  getmatchObject(WilayaOrig[0],WilayaEn)
        }else{
            MatchobjWil =  getmatchObject(WilayaOrig[0],Wilaya)
        }
      
      
        var IndexWil = MatchobjWil.Matches.bestMatchIndex;
       var bmS;
      var bmSer
      var TheMostSimilarWord ;
      console.log('No specialty provided ?')
      var counterElements = 0;
 
   
          var MatchobjSpecc;
          var MatchobjServv;
          if(lang == "en"){

            MatchobjSpecc = getmatchObject(theSpecialty,SpecialtyEn)
            MatchobjServv =  getmatchObject(theSpecialty,TheWordsEn);
        }else{
          MatchobjSpecc = getmatchObject(theSpecialty,Speciality)
          MatchobjServv =  getmatchObject(theSpecialty,TheWords);
                }
          
         
       //   console.log('this is all services : '+ JSON.stringify(MatchobjSpecc))
          bmS = MatchobjSpecc.Matches.bestMatch;
          bmSer = MatchobjServv.Matches.bestMatch;
        //  var ElementiQuestion = elem
        //  console.log('this is element : '+elem)
          if(parseFloat(bmS.rating).toFixed(2) > 0.40 || parseFloat(bmSer.rating).toFixed(2) > 0.40){
          //  ElementiQuestion = ElementQuery[counterElements]
          //  console.log('element rating : '+elem+ '  and rating: '+ bmSer.rating +' and spec rating : '+bmS.rating )
          //  console.log('element rating : '+elem+ '  and target: '+ bmSer.target +' and spec rating : '+bmS.target )

            // if(bmSer.rating>bmS.rating){
            //   TheMostSimilarWord = ElementiQuestion;

            // }else{
            //   TheMostSimilarWord = ElementiQuestion;

            // }
           
            if(parseFloat(bmS.rating).toFixed(2) > 0.40 ){
              MatchobjSpecc.Matches.ratings.forEach((elematch) =>{
              
                if(parseFloat(elematch.rating).toFixed(2) > 0.40 ||  elematch.target.toLowerCase().includes(theSpecialty.substring(0,theSpecialty.length-3),0)){
                    if(elematch.target.toLowerCase().includes(theSpecialty.substring(0,theSpecialty.length-4),0) && parseFloat(elematch.rating).toFixed(2) > 0.22 ){
                      var indexSp ;
                      if(lang == "en"){

                        indexSp = SpecialtyEn.indexOf(elematch.target)

                    }else{
                      indexSp = Speciality.indexOf(elematch.target)

                            }
                   
                      ListSuggestions.push({syno: elematch.target,title: elematch.target , type:"specialty",Number: ValueSpec[indexSp],org: theSpecialty})
                      listofRatSugesstion.push(elematch)

                    }
                }
               
          

              })

            }
            
            
            if(parseFloat(bmSer.rating).toFixed(2) > 0.30){
              MatchobjServv.Matches.ratings.forEach((elematch) =>{
                if(parseFloat(elematch.rating).toFixed(2) > 0.40 ||  elematch.target.toLowerCase().includes(theSpecialty.substring(0,theSpecialty.length-3),0)){
                  if(elematch.target.toLowerCase().includes(theSpecialty.substring(0,theSpecialty.length-4),0) && parseFloat(elematch.rating).toFixed(2) > 0.22){
                   
                    var indexSp ;
                    if(lang == "en"){

                      IndiceServ = TheWordsEn.indexOf(elematch.target);

                  }else{
                    IndiceServ = TheWords.indexOf(elematch.target);

                          }
                    ListSuggestions2.push({syno: elematch.target ,title: elematch.target+ " (Service)", type:"service",Number :TheValues[IndiceServ],org:theSpecialty})
                    listofRatSugesstion.push(elematch)
                  }
                 
                
                }

              })
  
            }



          }else{
            if(counterElements == ElementQuery.length-1){
              var Respeech ="";
              if(lang == "en"){
                 Respeech  = "What type of doctor or medical service are you looking for ? "
              }else{
                 Respeech = "Quelle est le service ou la specialité que vous cherchez ?"
              }
              var speechResponse = {
                "google": {
                  "expectUserResponse": true,
                  "richResponse": {
                    "items": [
                      {
                        "simpleResponse": {
                          "textToSpeech": Respeech
                        }
                      }
                    ],
             
                  }
                }
              
              };
              return res.json({
                payload: speechResponse,
                //data: speechResponse,
                fulfillmentText: speech,
                speech: speech,
                displayText: speech,
                source: "webhook-echo-sample"
              });
            }
         
          }
        
     
        counterElements++;

     
    
        if(ListSuggestions.length > 0 || ListSuggestions2.length>0){

            console.log('this is all suggestions : '+ JSON.stringify(listofRatSugesstion))
          if(bmSer.rating > bmS.rating){
            var Respeech ="";
            var disp = "";
            if(lang == "en"){
              disp = "I have found multiple services that match. which one of these would you like me to search for in " +WilayaOrig[0]+ " ? "
               Respeech  = "I have found multiple services that match. which one of these would you like me to search for ? "
            }else{
               disp = "Voulez vous continué avec ce service : "+ bmSer.target +" ?"+  " car j'ai trouvez d'autre."
               Respeech = "J'ai trouvé plusieurs services qui correspondent. lequel de ces éléments aimeriez-vous que je recherche?"
            }
            
           
          }else{
            var Respeech ="";
            var ListWord;
            if(lang == "en"){
              disp = "I have found multiple services that match. which one of these would you like me to search for in " +WilayaOrig[0]+ " ? "
              ListWord = "List of Services/Specialties : "
               Respeech  = "I have found multiple doctors who match your search. which one of these would you like me to search for ? "
            }else{
             
        
             ListWord = "La list des Services/Specialité : "
               Respeech = "Voulez vous continué avec ce service : "+ bmS.target +" ?"+  " car j'ai trouvez d'autre."
               disp = "Voulez vous continué avec ce service : "+ bmSer.target +" ?"+  " car j'ai trouvez d'autre."

              }

          }
          var NewList = ListSuggestions.concat(ListSuggestions2);
          console.log("NEW LIST : "+ JSON.stringify(NewList))
          if(NewList.length == 1){
            // Actions on Google doesnt' allow list to have less than 2 items
            //var originalSpec = NewList[0].org
              NewList.push({
                syno: "I can't find it" ,
                title: "You can't find it here?",
                 type:"NOTFOUND",
                 Number :"0",
                 org:"org"
              })
          }
          
          if(NewList.length>= 30){
            NewList= NewList.slice(0,29)
          }
          var Items = [];
           NewList.forEach(term =>{
            //  var item =    {
            //   "optionInfo": {
            //     "key": "RDV44F "+IndexWil+ " " +term.Number + " "+ term.type+ " "+ term.title,
            //     "synonyms": [
            //       term.syno,
            //     ]
            //   },
            //   "description": "Similar to "+ theSpecialty,
            //   "image": {
            //     "url": "https://i.imgur.com/JTlpSdB.png",
            //     "accessibilityText": "suggestion"
            //   },
            //   "title": ""+term.title
            // }
            var item;
            if(term.type != "NOTFOUND"){
             item =    {
               "optionInfo": {
                 "key": "RDV44F "+IndexWil+ " " +term.Number + " "+ term.type+ " "+ term.title,
                 "synonyms": [
                   term.syno,
                 ]
               },
               "description": "Similar to "+ term.org,
               "image": {
                 "url": "https://i.imgur.com/JTlpSdB.png",
                 "accessibilityText": "suggestion"
               },
               "title": ""+term.title
             }
            }else{
              item =    {
               "optionInfo": {
                 "key": "NOTFOUND",
                 "synonyms": [
                   "Not found","Can't find it","untrouvable",
                 ]
               },
               "description": "Only 1 result",
               // "image": {
               //   "url": "https://i.imgur.com/JTlpSdB.png",
               //   "accessibilityText": "suggestion"
               // },
               "title": ""+term.title
             }
            }
            Items.push(item)
            if(Items.length == NewList.length){
         
              var speechResponse = {
                "google": {
                  "expectUserResponse": true,
                  "richResponse": {
                    "items": [
                      {
                        "simpleResponse": {
                          "textToSpeech": Respeech,
                          displayText : disp
                        }
                      }
                    ],
                    "suggestions": [
                      {
                        "title": "Cancel"
                      },
                 
                    ]
                  },
                  "systemIntent": {
                    "intent": "actions.intent.OPTION",
                    "data": {
                      "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                      "listSelect": {
                        "title": ListWord,
                        "items": Items
                      }
                    }
                  }
                }
              }
              return res.json({
                payload: speechResponse,
                //data: speechResponse,
                fulfillmentText: speech,
                speech: speech,
                displayText: speech,
                source: "webhook-echo-sample"
              });
            }
           })

    
        
        }
//         var  MatchobjSpec ;var  MatchobjServ;var bmSpec;var bmServ;var  MatchobjWil;
//         if(lang == "en"){
//             MatchobjSpec =  getmatchObject(theSpecialty.toLowerCase(),SpecialtyEn)
//           // console.log("this is list of all spec : "+ JSON.stringify(MatchobjSpec))
//             MatchobjServ =  getmatchObject(theSpecialty.toLowerCase(),TheWordsEn)
//            bmSpec = MatchobjSpec.Matches.bestMatch;
//            bmServ = MatchobjServ.Matches.bestMatch;
//             MatchobjWil =  getmatchObject(WilayaOrig[0],WilayaEn)
//         }else{
//             MatchobjSpec =  getmatchObject(theSpecialty.toLowerCase(),Speciality)
//           // console.log("this is list of all spec : "+ JSON.stringify(MatchobjSpec))
//                    MatchobjServ =  getmatchObject(theSpecialty.toLowerCase(),TheWords)
//                   bmSpec = MatchobjSpec.Matches.bestMatch;
//                   bmServ = MatchobjServ.Matches.bestMatch;
//             MatchobjWil =  getmatchObject(WilayaOrig[0],Wilaya)
//         }
//         var  MatchobjWil =  getmatchObject(WilayaOrig[0],Wilaya)
//         var bmWil = MatchobjWil.Matches.bestMatch;
//         VarWiltemp = bmWil.target;
//         var NumberofPages ;
//         console.log('this is the saved search value inside : '+ VarWiltemp)
   
//         var IndexSpec = ValueSpec[MatchobjSpec.Matches.bestMatchIndex];
//         var IndiceServ;
//         var IndexWil = MatchobjWil.Matches.bestMatchIndex;
//         console.log('rating of Spec: '+ bmSpec.rating + " Specialty is : "+ bmSpec.target )
//         console.log('Index wil : '+bmWil.target + " is : "+ IndexWil + ' and specialty : '+ bmSpec.target+ " "+IndexSpec)
//         console.log("Service : "+ bmServ.target+ " rating : "+ bmServ.rating)

//         if(bmSpec.rating> bmServ.rating){
//           VarSpectemp = bmSpec.target;
//             var url2= 'https://sihhatech.com/etablissements?name='+'&speciality='+IndexSpec+'&wilaya='+IndexWil

//           }
//           else{
//             VarSpectemp = bmServ.target;
//             IndiceServ = TheValues[MatchobjServ.Matches.bestMatchIndex];
           
//             var url2= 'https://sihhatech.com/etablissements?name='+'&service='+IndiceServ+'&wilaya='+IndexWil

//           }
//          console.log('the link : '+ url2)
//          axios(url2)
//          .then(response => {
//            const html = response.data;
//            const $ = cheerio.load(html)
//            //const postsModul = $('.row')
//            const mname = $('.row')
//            const pie = $('.etablissement__inlist');
//            const Spages = $('.page-item').text();
//            const pElement = $('.pagination').text()
//            var countpag = 0;
       
//            $(".pagination").find('li').each(function() {
//             // 
//             if(countpag == $(".pagination").find('li').length-2){
//               var $this = $(this);
//             //  console.log('the Value of PNUM : '+ $this.text() )
//               NumberofPages = Number($this.text());
//               if(NumberofPages >1){
//                 NumberofPages = 20*Number($this.text());
//               }
              
//             }
//               countpag++;
            
//             //var $this = $(this);
//           // console.log('this is Spages 2: '+$this.text()+ ' annd counter : '+ countpag)

        
          
//           })
       
    
//            console.log('Mname length: '+pie.length)
//            if(pie.length >0){
//   // const statsTable = $('.statsTableContainer > tr');
//   const topPremierLeagueScorers = [];
//   //  console.log(postsModul)
//   var counter = 0;
//   var elements = [];
//   var DoctorsNumber;
//   var ListofAddresses = [];
//   var ListofUrls  = [];
//   var ListofNumbers = [];
//   var ListofNames = [];
//   var nn = $('.link').text()
//   var npart = $('.link')
//   var roww = $('.address').text()
//   var plink ="https://i.imgur.com/JIARaOF.png";

// //    var parts = nn.split('Dr.');
//   var NameofDoc;

//     pie.each(function () {
   
          
//           var address =  $(this).find('p').text();
//           console.log('Address : '+address)
//           var comStat =  $(this).find('h5').text();
//           console.log('this is comstat : '+ comStat)
//             ListofAddresses.push(address)
//             var urll = $(this).find('.link').attr('href');
//       //      console.log('Modname : '+urll)
//             ListofUrls.push(urll)
//        //     console.log(parts[counter] +'  '+ urll)
//           //  ListofNames.push(parts[counter])dsfsdfdsfs
//           axios(urll)
//           .then(response => {
//             var objDoc;
//             var listofExtra = [];
//             const html = response.data;
//             const $ = cheerio.load(html)
//             var countpag2 = 0;
//             var comm =  $(".col-md-4").find('p > strong').text();
//             console.log('comm : '+ comm)
//              $(".content").find('li').each(function() {
//               // 
             
//                 var $this = $(this);
//                 console.log('the Value of PNUM : '+ $this.text() )
//                 listofExtra.push( $this.text())
                
//                 countpag2++;
                
            
            
     
          
            
//             })
//          NameofDoc =  $(".col-md-4").find('.link').text()
//            //  .each(function() {
//            //    // 
//            //    var $this = $(this);
             
//            //   if($this.text().substring(0,3) == 'Dr.'){
             
//            //   //console.log('Element : '+$this.text().split('Dr.')[1].split('د.')[0])
//            //   // NameofDoc = $this.text().split('Dr.')[1].split('  ')[0];
//            //   // if(!NameofDoc){
//            //   //   NameofDoc = $this.text().split('د.')[1].split('  ')[0];
//            //   // }
//            //  }
//            //  })
       
//            var datalist = [];
//             $(".col-md-4").find('p').each(function() {
                
//                 var $this = $(this);
//                 datalist.push($this.text())
//           //      console.log('this is item : '+$this.text())
//                 if($this.text().substring(0,1) == '0'){
                  
//                   DoctorsNumber = $this.text();
                 
//            //     
//                 ListofNumbers.push(DoctorsNumber)
//                 }
//                 if(datalist.length == 4){
//                    objDoc = {
//                     url : urll,
//                     name : NameofDoc,
//                     Numb : datalist[3],
//                     com:datalist[1],
//                     addres: datalist[2]+ ' ' +datalist[1],
//                     specex: datalist[0],

//                   }
//                //   console.log('WE  :'+JSON.stringify(objDoc))
//                 }
               
//                 //if(count == )

//             })
//            // ListofAddresses.push(datalist)
//            console.log('the number : '+ objDoc.Numb)
//            console.log('The List OF EXTRAS  : '+ listofExtra)
//            var DocItem =   {
//             "optionInfo": {
//               "key": objDoc.addres+" XXX "+objDoc.Numb +" XXX "+ objDoc.url +" XXX "+objDoc.specex+" XXX "+listofExtra,
         
//               "synonyms": [
//                 ""+objDoc.name,
             
             
                
//               ]
//             },
//             "description": objDoc.com,
//             "image": {
//               "url": "https://i.imgur.com/wugD3le.png",
//               "accessibilityText": "Image alternate text"
//             },
//             "title": ""+objDoc.name
//           }
          
//           elements.push(DocItem)
//             if(elements.length == 20 || (pie.length < 20 && elements.length == pie.length)){
//         /// HERE/
//              try {
//                if(!NumberofPages){
//                  NumberofPages  = pie.length;
//                }
               
//                if(elements.length > 1){
//                  var Respeech ="";
//                  if(lang == "en"){
//                     Respeech  = "Okay , I found "+ NumberofPages + " results :"
//                  }else{
//                     Respeech = "Okay, J'ai trouvé "+ NumberofPages + " "+theSpecialty+ " dans "+ WilayaOrig;
//                  }
//                 var speechResponse = {
//                   "google": {
//                     "expectUserResponse": true,
//                     "systemIntent": {
//                       "intent": "actions.intent.OPTION",
//                       "data": {
//                         "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
//                         "listSelect": {
//                       //    "title": "List des "+theSpecialty+ " dans "+ WilayaOrig,
//                           "items": elements,
                          
                        
//                         }
//                       }
//                     },
//                     "richResponse": {
//                       "items": [
//                         {
//                           "simpleResponse": {
//                             "textToSpeech": Respeech
//                           }
//                         }
//                       ],
//                       "linkOutSuggestion": {
//                         "destinationName": "Voir+",
//                         "url": ""+url2+"&page=2",
//                       },
//                       suggestions: [
//                        {
//                          "title": "Cancel"
//                        },
//                       //  {
//                       //    "title": "Merci"
//                       //  }
//                      ]
//                     }
//                   }
//                 }
//                }else{
//                  var Respeech ="";
//                  var searchword = "Cherchez"
//                  if(lang == "en"){
//                    searchword = "Thanks"
//                     Respeech  = "Alright , I found 1 result that matches. Here is the available information on it: "
//                  }else{
//                    searchword = "Merci"
//                     Respeech = "J'ai trouvé une seule Resultat, Voici Les information disponible : "
//                  }
//                   var speechResponse = {
//                     google: {
//                       expectUserResponse: false,
//                       richResponse: {
//                         items: [
//                           {
//                             simpleResponse: {
//                               textToSpeech: Respeech
//                             }
//                           },
//                           {
//                             basicCard: {
//                               "title": ""+objDoc.name,
//                               "subtitle": ""+objDoc.specex,
//                               "formattedText": ""+objDoc.addres + " \n "+ objDoc.Numb,
//                               "image": {
//                                 "url": "https://i.imgur.com/wugD3le.png",
//                                 "accessibilityText": "This is an image of an image"
//                               },
//                               "buttons": [
//                                 {
//                                   "title": "Appel",
//                                   "openUrlAction": {
//                                     "url": "https://testwebviewoperation.herokuapp.com/tesst?dialnum="+objDoc.Numb
//                                   }
//                                 }
//                               ],
//                               "imageDisplayOptions": "WHITE"
//                             }
                        
//                           },
                         
                         
//                         ],
//                         linkOutSuggestion: {
//                           "destinationName": "Profile/Agenda",
//                           "url": ""+objDoc.url,
//                         },
//                         suggestions: [
//                           {
//                             "title": searchword
//                           },
//                           {
//                             "title": "Cancel"
//                           }
//                         ]
                
//                       }
//                     }
//                   };

//                }

//             return res.json({
//                 payload: speechResponse,
//                 //data: speechResponse,
//                 fulfillmentText: speech,
//                 speech: speech,
//                 displayText: speech,
//                 source: "webhook-echo-sample"
//               });
//              } catch (error) {
//                console.log('there has been an error we caatched')
//              }
              
//                 return;
//         //      }
//             }
//        //     counter++;
//           //   console.log('Phone numbe : '+phoneRawText)
//           //  var match = phoneRawText.match(/(\d{10})|(\d{9})$/)
//           //    console.log('Phone numbe : '+match)
//            }).catch(console.error);
         
           
       
 
           
      
           
           
//     })
//            }else{
//             var Respeech ="";
//              if(lang == "en"){
//                 Respeech  = "I have found no results for this."
//              }else{
//                 Respeech = "Désolé, J'ai trouvé aucune resultat"
//              }
//               var speechResponse = {
//                "google": {
//                  "expectUserResponse": true,
//                  "richResponse": {
//                    "items": [
//                      {
//                        "simpleResponse": {
//                          "textToSpeech":Respeech,
//                         // "displayText": "Howdy! I can tell you fun facts about almost any number, like 42. What do you have in mind?"
//                        }
//                      }
//                    ]
//                  }
//                }
//               }
//               return res.json({
//                payload: speechResponse,
//                //data: speechResponse,
//                fulfillmentText: speech,
//                speech: speech,
//                displayText: speech,
//                source: "webhook-echo-sample"
//              });  
//            }
        
       
//          })
         
//          .catch(console.error);  
      }


      if(theSpecialty.length > 0){
      
      }
      else{

     //   if(WilayaOrig[0]){
          var  MatchobjWil;
          var wordDoctor = "doctor";
          var wordDoctor2 = "medecin";
          if(lang == "en"){
              wordDoctor = "doctor"
              MatchobjWil =  getmatchObject(WilayaOrig[0],WilayaEn)
          }else{
            wordDoctor = "médecin"
              MatchobjWil =  getmatchObject(WilayaOrig[0],Wilaya)
          }
        
        
          var IndexWil = MatchobjWil.Matches.bestMatchIndex;
         var bmS;
        var bmSer
        var TheMostSimilarWord ;
        console.log('No specialty provided ?')
        var counterElements = 1;
        var SearchableText = texttosearch.split(" ");
        SearchableText.forEach(elem => {
          console.log("These are all the elem words : "+ elem)
          counterElements++;
          if(elem.length>2 && (elem.toLowerCase() != wordDoctor && elem.toLowerCase() != wordDoctor2 ) ){
            var MatchobjSpecc;
            var MatchobjServv;
            if(lang == "en"){
  
              MatchobjSpecc = getmatchObject(elem,SpecialtyEn)
              MatchobjServv =  getmatchObject(elem,TheWordsEn);
          }else{
            MatchobjSpecc = getmatchObject(elem,Speciality)
            MatchobjServv =  getmatchObject(elem,TheWords);
                  }
            
           
         //   console.log('this is all services : '+ JSON.stringify(MatchobjSpecc))
            bmS = MatchobjSpecc.Matches.bestMatch;
            bmSer = MatchobjServv.Matches.bestMatch;
            var ElementiQuestion = elem
            console.log('this is element : '+elem)
            console.log("The Ratings : BMSpec : "+ bmS.rating+ "  and BmService : "+ bmSer.rating)
            if(parseFloat(bmS.rating).toFixed(2) > 0.40 || parseFloat(bmSer.rating).toFixed(2) > 0.40){
              ElementiQuestion = SearchableText[counterElements]
              console.log('element rating : '+elem+ '  and rating: '+ bmSer.rating +' and spec rating : '+bmS.rating )
              console.log('element rating : '+elem+ '  and target: '+ bmSer.target +' and spec rating : '+bmS.target )
  
              // if(bmSer.rating>bmS.rating){
              //   TheMostSimilarWord = ElementiQuestion;
  
              // }else{
              //   TheMostSimilarWord = ElementiQuestion;
  
              // }
             
              if(parseFloat(bmS.rating).toFixed(2) > 0.40 ){
                MatchobjSpecc.Matches.ratings.forEach((elematch) =>{
                 if(elem.length>3){
                  if(parseFloat(elematch.rating).toFixed(2) > 0.40 ||  elematch.target.toLowerCase().includes(elem.substring(0,elem.length-3),0)){
                      if(elematch.target.toLowerCase().includes(elem.substring(0,elem.length-4),0) && parseFloat(elematch.rating).toFixed(2) > 0.22 ){
                        var indexSp ;
                        if(lang == "en"){
  
                          indexSp = SpecialtyEn.indexOf(elematch.target)
  
                      }else{
                        indexSp = Speciality.indexOf(elematch.target)
  
                              }
                     
                        ListSuggestions.push({syno: elematch.target,title: elematch.target , type:"specialty",Number: ValueSpec[indexSp],org: elem})
                        listofRatSugesstion.push(elematch)
  
                      }
                  }
                 }
            
  
                })
  
              }
              
              
              if(parseFloat(bmSer.rating).toFixed(2) > 0.30){
                MatchobjServv.Matches.ratings.forEach((elematch) =>{
                  if(parseFloat(elematch.rating).toFixed(2) > 0.40 ||  elematch.target.toLowerCase().includes(elem.substring(0,elem.length-3),0)){
                    if(elematch.target.toLowerCase().includes(elem.substring(0,elem.length-4),0) && parseFloat(elematch.rating).toFixed(2) > 0.22){
                     
                      var indexSp ;
                      if(lang == "en"){
  
                        IndiceServ = TheWordsEn.indexOf(elematch.target);
  
                    }else{
                      IndiceServ = TheWords.indexOf(elematch.target);
  
                            }
                      ListSuggestions2.push({syno: elematch.target ,title: elematch.target+ " (Service) ", type:"service",Number :TheValues[IndiceServ],org:elem})
                      listofRatSugesstion.push(elematch)
                    }
                   
                  
                  }
  
                })
    
              }
  
  
  
            }else{
              console.log("No element word had a match , time to ask for the specialty or service "+ counterElements)
              console.log("Length of SearchableQuery : "+ SearchableText.length)    
              console.log("SearchableQuery : "+ SearchableText)               
              if(counterElements >= SearchableText.length-2){
                var Respeech ="";
                if(lang == "en"){
                   Respeech  = "What type of doctor or medical service are you looking for ? "
                }else{
                   Respeech = "Quelle est le service ou la specialité que vous cherchez ?"
                }
                var speechResponse = {
                  "google": {
                    "expectUserResponse": true,
                    "richResponse": {
                      "items": [
                        {
                          "simpleResponse": {
                            "textToSpeech": Respeech
                          }
                        }
                      ],"suggestions": [
                        {
                          "title": "Cancel"
                        },
                     
                      ]
               
                    }
                  }
                
                };
                return res.json({
                  payload: speechResponse,
                  //data: speechResponse,
                  fulfillmentText: speech,
                  speech: speech,
                  displayText: speech,
                  source: "webhook-echo-sample"
                });
              }
           
            }
          }
       
          

        })
      
          if(ListSuggestions.length > 0 || ListSuggestions2.length>0){
              console.log('this is all suggestions : '+ JSON.stringify(listofRatSugesstion))
              if(bmSer.rating > bmS.rating){
                var Respeech ="";
                var disp = "";
                if(lang == "en"){
                  disp = "I have found multiple services that match. which one of these would you like me to search for in " +WilayaOrig[0]+ " ? "
                   Respeech  = "I have found multiple services that match. which one of these would you like me to search for ? "
                }else{
                   disp = "Voulez vous continué avec ce service : "+ bmSer.target +" ?"+  " car j'ai trouvez d'autre."
                   Respeech = "J'ai trouvé plusieurs services qui correspondent. lequel de ces éléments aimeriez-vous que je recherche?"
                }
                
               
              }else{
                var Respeech ="";
                var ListWord = "La list des Services/Specialité : "
                if(lang == "en"){
                  disp = "I have found multiple services that match. which one of these would you like me to search for in " +WilayaOrig[0]+ " ? "
                  ListWord = "List of Services/Specialties : "
                   Respeech  = "I have found multiple doctors who match your search. which one of these would you like me to search for  ?"
                }else{
                  ListWord = "La list des Services/Specialité : "
                   Respeech = "Voulez vous continué avec ce service : "+ bmS.target +" ?"+  " car j'ai trouvez d'autre."
                   disp = "Voulez vous continué avec ce service : "+ bmSer.target +" ?"+  " car j'ai trouvez d'autre."
    
                  }
    
              }
            // if(bmSer.rating > bmS.rating){
            //   var Respeech ="";
            //   if(lang == "en"){
            //      Respeech  = "I have found multiple services that match. which of these would you like me to get ? "
            //   }else{
            //      Respeech = "Voulez vous continué avec ce service : "+ bmSer.target +" ?"+  " car j'ai trouvez d'autre."
            //   }
              
             
            // }else{
            //   var Respeech ="";
            //   if(lang == "en"){
            //      Respeech  = "I have found multiple doctors that match . which one of these would you like me to get ? "
            //   }else{
            //      Respeech = "Voulez vous continué avec ce service : "+ bmS.target +" ?"+  " car j'ai trouvez d'autre."
            //   }

            // }
            var NewList = ListSuggestions.concat(ListSuggestions2);
            console.log("NEW LIST : "+ JSON.stringify(NewList))
            var Items = [];
            if(NewList.length == 1){
              // Actions on Google doesnt' allow list to have less than 2 items
              //var originalSpec = NewList[0].org
                NewList.push({
                  syno: "I can't find it" ,
                  title: "You can't find it here?",
                   type:"NOTFOUND",
                   Number :"0",
                   org:"org"
                })
            }
             NewList.forEach(term =>{
              var item;
               if(term.type != "NOTFOUND"){
                item =    {
                  "optionInfo": {
                    "key": "RDV44F "+IndexWil+ " " +term.Number + " "+ term.type+ " "+ term.title,
                    "synonyms": [
                      term.syno,
                    ]
                  },
                  "description": "Similar to "+ term.org,
                  "image": {
                    "url": "https://i.imgur.com/JTlpSdB.png",
                    "accessibilityText": "suggestion"
                  },
                  "title": ""+term.title
                }
               }else{
                 item =    {
                  "optionInfo": {
                    "key": "NOTFOUND",
                    "synonyms": [
                      "Not found","Can't find it","untrouvable",
                    ]
                  },
                  "description": "Only 1 result",
                  // "image": {
                  //   "url": "https://i.imgur.com/JTlpSdB.png",
                  //   "accessibilityText": "suggestion"
                  // },
                  "title": ""+term.title
                }
               }
             
              Items.push(item)
              if(Items.length == NewList.length){
           
                var speechResponse = {
                  "google": {
                    "expectUserResponse": true,
                    "richResponse": {
                      "items": [
                        {
                          "simpleResponse": {
                            "textToSpeech": Respeech,
                            displayText: disp
                          }
                        }
                      ],"suggestions": [
                        {
                          "title": "Cancel"
                        },
                     
                      ]
                    },
                    "systemIntent": {
                      "intent": "actions.intent.OPTION",
                      "data": {
                        "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                        "listSelect": {
                          "title": ListWord,
                          "items": Items
                        }
                      }
                    }
                  }
                }
                return res.json({
                  payload: speechResponse,
                  //data: speechResponse,
                  fulfillmentText: speech,
                  speech: speech,
                  displayText: speech,
                  source: "webhook-echo-sample"
                });
              }
             })

      
          
          }
      //  }
     
   
      }
      console.log("this is wilaaya : "+WilayaOrig)
  
   
   
      break;
      case "Polo" : 
      var speech = req.body.queryResult.queryText;

      var ObjectDocDetails;
      var Contexts;
      var ContextsList = req.body.queryResult.outputContexts;
      console.log('Context : '+ JSON.stringify(ContextsList))
      for (let index = 0; index < ContextsList.length; index++) {
        const element = ContextsList[index];
       if(element.name.includes("/actions_intent_option")){
          Contexts = element;
       }

        
      }
      if(Contexts){
        if(Contexts.parameters.OPTION.includes("RDV44F")){
            var contxterms = Contexts.parameters.OPTION.split(" ") 
            var WilNum = Number(contxterms[1]);
            var SSVNum = Number(contxterms[2]);
            var type = contxterms[3];
            if(type == "specialty"){
              var url2= 'https://sihhatech.com/etablissements?name='+'&speciality='+SSVNum+'&wilaya='+WilNum
  
            }
            else{
             // IndiceServ = TheValues[MatchobjServ.Matches.bestMatchIndex];
             
              var url2= 'https://sihhatech.com/etablissements?name='+'&service='+SSVNum+'&wilaya='+WilNum
  
            }
           console.log('the link : '+ url2)
           axios(url2)
           .then(response => {
             const html = response.data;
             const $ = cheerio.load(html)
             //const postsModul = $('.row')
             const mname = $('.row')
             const pie = $('.etablissement__inlist');
             const Spages = $('.page-item');
             console.log('number of pages : '+Spages.length)
            // const rows = 
            // console.log('LLKLLL : '+rows)
             console.log('Mname length: '+pie.length)
            // const statsTable = $('.statsTableContainer > tr');
             const topPremierLeagueScorers = [];
           //  console.log(postsModul)
           var NumberofPages ;
           var counter = 0;
           var elements = [];
           var DoctorsNumber;
           var ListofAddresses = [];
           var ListofUrls  = [];
           var ListofNumbers = [];
           var ListofNames = [];
           var nn = $('.link').text()
           var npart = $('.link')
           var roww = $('.address').text()
           var plink ="https://i.imgur.com/JIARaOF.png";
            var countpag =0;
           $(".pagination").find('li').each(function() {
            // 
            if(countpag == $(".pagination").find('li').length-2){
              var $this = $(this);
            //  console.log('the Value of PNUM : '+ $this.text() )
              NumberofPages = Number($this.text());
              if(NumberofPages >1){
                NumberofPages = 20*Number($this.text());
              }
              
            }
              countpag++;
            
            //var $this = $(this);
          // console.log('this is Spages 2: '+$this.text()+ ' annd counter : '+ countpag)

        
          
          })
       //    var parts = nn.split('Dr.');
           var NameofDoc;
              if(pie.length >0){
                pie.each(function () {
            
                   
                  var address =  $(this).find('p').text();
                  console.log('Modname : '+address)
                    ListofAddresses.push(address)
                    var urll = $(this).find('.link').attr('href');
                    console.log('Modname : '+urll)
                    ListofUrls.push(urll)
               //     console.log(parts[counter] +'  '+ urll)
                  //  ListofNames.push(parts[counter])
                  axios(urll)
                  .then(response => {
                    var objDoc;
                    const html = response.data;
                    const $ = cheerio.load(html)

                    $(".col-md-4").find('.link').each(function() {
                      // 
                      var $this = $(this);
                     
                     if($this.text().substring(0,3) == 'Dr.'){
                     
                     //console.log('Element : '+$this.text().split('Dr.')[1].split('د.')[0])
                     NameofDoc = $this.text().split('Dr.')[1].split('  ')[0];
                    }
                    })
               
                   var datalist = [];
                    $(".col-md-4").find('p').each(function() {
                        
                        var $this = $(this);
                        datalist.push($this.text())
                  //      console.log('this is item : '+$this.text())
                        if($this.text().substring(0,1) == '0'){
                          
                          DoctorsNumber = $this.text();
                         
                   //     
                        ListofNumbers.push(DoctorsNumber)
                        }
                        if(datalist.length == 4){
                           objDoc = {
                            url : urll,
                            name : NameofDoc,
                            Numb : datalist[3],
                            addres: datalist[2]+ ' ' +datalist[1],
                            specex: datalist[0],
        
                          }
                       //   console.log('WE  :'+JSON.stringify(objDoc))
                        }
                       
                        //if(count == )
        
                    })
                   // ListofAddresses.push(datalist)
                   console.log('the number : '+ objDoc.Numb)
                 
                   var DocItem =   {
                    "optionInfo": {
                      "key": objDoc.addres+" XXX "+objDoc.Numb +" XXX "+ objDoc.url +" XXX "+objDoc.specex,
                      "synonyms": [
                        ""+objDoc.name,
                     
                     
                        
                      ]
                    },
                    "description": objDoc.specex,
                    "image": {
                      "url": "https://i.imgur.com/wugD3le.png",
                      "accessibilityText": "Image alternate text"
                    },
                    "title": ""+objDoc.name
                  }
                   
                  elements.push(DocItem)
                    if(elements.length == 20 || (pie.length < 20 && elements.length == pie.length)){
                /// HERE/
                     try {
                       if(!NumberofPages){
                         NumberofPages  = pie.length;
                       }
                       if(elements.length > 1){

                         var Respeech ="";
                         if(lang == "en"){
                            Respeech  = "I have found "+ NumberofPages + " results for this. Choose one on from the list to get more info on it"
                         }else{
                            Respeech = "Okay, J'ai trouvé "+ NumberofPages + " "+contxterms[4] + ". Choisissez-en un de la liste pour en savoir plus"
                         }
                        var speechResponse = {
                          "google": {
                            "expectUserResponse": true,
                            "systemIntent": {
                              "intent": "actions.intent.OPTION",
                              "data": {
                                "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                                "listSelect": {
                                //  "title": "List des "+contxterms[4]+ " dans "+ contxterms[2],
                                  "items": elements,
                                  
                               
                                }
                              }
                            },
                            "richResponse": {
                              "items": [
                                {
                                  "simpleResponse": {
                                    "textToSpeech": Respeech
                                  }
                                }
                              ],
                              "linkOutSuggestion": {
                                "destinationName": "Plus de resultat",
                                "url": ""+url2,
                              }
                            }
                          }
                        }
                       }
                       else{
                         var Respeech ="";
                         var CallWord = "Appel"
                         var searchword = "Cherchez"
                         var searchword2 = "Cherchez"
                         if(lang == "en"){
                           CallWord = "Call"
                           searchword = "Thanks"
                           searchword2 = "Search"
                            Respeech  = "I have found 1 result for this. Here are the information available: "
                         }else{
                           searchword2 = "Cherchez"
                           searchword = "Merci"
                            Respeech = "J'ai trouvé une seule Resultat, Voici Les information disponible : "
                         }
                          var speechResponse = {
                            google: {
                              expectUserResponse: false,
                              richResponse: {
                                items: [
                                  {
                                    simpleResponse: {
                                      textToSpeech: Respeech
                                    }
                                  },
                                  {
                                    basicCard: {
                                      "title": ""+objDoc.name,
                                      "subtitle": ""+objDoc.specex,
                                      "formattedText": ""+objDoc.addres + " \n "+ objDoc.Numb,
                                     //  "image": {
                                     //    "url": "https://i.imgur.com/DcioSES.png",
                                     //    "accessibilityText": "This is an image of an image"
                                     //  },
                                      "buttons": [
                                        {
                                          "title": CallWord,
                                          "openUrlAction": {
                                            "url": "https://testwebviewoperation.herokuapp.com/tesst?dialnum="+objDoc.Numb
                                          }
                                        }
                                      ],
                                     //  "imageDisplayOptions": "WHITE"
                                    }
                               
                                  },
                                 
                                 
                                ],
                                linkOutSuggestion: {
                                  "destinationName": "Visit Website",
                                  "url": ""+objDoc.url,
                                },
                                // suggestions: [
                                //   {
                                //     "title": searchword
                                //   },
                                //   {
                                //     "title": "Cancel"
                                //   }
                                // ]
                        
                              }
                            }
                          };
 
                       }
 
                    return res.json({
                        payload: speechResponse,
                        //data: speechResponse,
                        fulfillmentText: speech,
                        speech: speech,
                        displayText: speech,
                        source: "webhook-echo-sample"
                      });
                     } catch (error) {
                       console.log('there has been an error we caatched')
                     }
                      
                        return;
                //      }
                    }
               //     counter++;
                  //   console.log('Phone numbe : '+phoneRawText)
                  //  var match = phoneRawText.match(/(\d{10})|(\d{9})$/)
                  //    console.log('Phone numbe : '+match)
                   }).catch(console.error);
                 
                   
               
         
                   
              
                   
                   
            })
              }else{
                var Respeech ="";
                var yesvalue; 
                var novalue;
                if(lang == "en"){
                  yesvalue = "yes";
                   Respeech  = "I have found no results for this. would you like to try another search ?"
                }else{
                  yesvalue= "oui"
                   Respeech = "Désolé, J'ai trouvé aucune resultat, voulez-vous essayer une autre recherche?"
                }
                 var speechResponse = {
                  "google": {
                    "expectUserResponse": true,
                    "richResponse": {
                      "items": [
                        {
                          "simpleResponse": {
                            "textToSpeech": Respeech,
                        //    "displayText": "Howdy! I can tell you fun facts about almost any number, like 42. What do you have in mind?"
                          }
                        }
                      ],
                      suggestions: [
                        {
                          "title": yesvalue
                        },
                        {
                          "title": "Cancel"
                        }
                      ]
                    }
                  }
                 }
                 return res.json({
                  payload: speechResponse,
                  //data: speechResponse,
                  fulfillmentText: speech,
                  speech: speech,
                  displayText: speech,
                  source: "webhook-echo-sample"
                });
              }
           
         
           })
           
           .catch(console.error);  
        }
        if(Contexts.parameters.OPTION.includes("XXX")){
          ObjectDocDetails = Contexts.parameters.OPTION.split("XXX")
          console.log("Objecet details : "+ ObjectDocDetails)
          var ExtraServices  = ObjectDocDetails[4];
          if(!ExtraServices){
              ExtraServices = "";
          }
          var Name = req.body.originalDetectIntentRequest.payload.inputs[0].rawInputs[0].query;
          if(ObjectDocDetails[1].length>8){
            var Respeech ="";
            var searchword = "Cherchez";
            var CallWord = "Appel"
    

            if(lang == "en"){
              searchword = "Thanks"
                CallWord = "Call"
               Respeech  = "Here are the information available  "
            }else{
              searchword = "Merci"
              CallWord = "Appel"
               Respeech = "Voici les information disponible pour ce médecin "
            }
            var speechResponse = {
              google: {
                expectUserResponse: false,
                richResponse: {
                  items: [
                    {
                      simpleResponse: {
                        textToSpeech: Respeech
                      }
                    },
                    {
                      basicCard: {
                        "title": ""+Name,
                        "subtitle": ""+ObjectDocDetails[3] ,
                        "formattedText": ""+ObjectDocDetails[0] + " \n "+ ObjectDocDetails[1]+ ' \n '+ ExtraServices,
                        // "image": {
                        //   "url": "https://i.imgur.com/DcioSES.png",
                        //   "accessibilityText": "This is an image of an image"
                        // },
                        "buttons": [
                          {
                            "title": CallWord,
                            "openUrlAction": {
                              "url": "https://testwebviewoperation.herokuapp.com/assistcall?dialnum="+ObjectDocDetails[1]
                            }
                          }
                        ],
                        "imageDisplayOptions": "WHITE"
                      }
                    
                    },
                   
                   
                  ],
                  linkOutSuggestion: {
                    "destinationName": "Visit Website",
                    "url": ""+ObjectDocDetails[2],
                  },
                  // suggestions: [
                  //   {
                  //     "title": searchword
                  //   },
                  //   {
                  //     "title": "Cancel"
                  //   }
                  // ]
          
                }
              }
            };
          }else{
            var Respeech ="";
            var searchword = "Cherchez"
            if(lang == "en"){
              searchword = "Thanks"

               Respeech  = "Here are the information available : "
            }else{
             searchword = "Merci"

               Respeech = "Voici les information disponible pour ce médecin "
            }
            var speechResponse = {
              google: {
                expectUserResponse: true,
                richResponse: {
                  items: [
                    {
                      simpleResponse: {
                        textToSpeech: Respeech
                      }
                    },
                    {
                      basicCard: {
                        "title": ""+Name,
                        "subtitle": ""+ObjectDocDetails[3],
                        "formattedText": ""+ObjectDocDetails[0] + " \n "+ ObjectDocDetails[1],
                        "image": {
                          "url": "https://i.imgur.com/wugD3le.png",
                          "accessibilityText": "This is an image of an image"
                        },
                        // "buttons": [
                        //   {
                        //     "title": "Appel",
                        //     "openUrlAction": {
                        //       "url": "https://testwebviewoperation.herokuapp.com/tesst"
                        //     }
                        //   }
                        // ],
                        "imageDisplayOptions": "WHITE"
                      }
                    
                    },
                   
                   
                  ],
                  linkOutSuggestion: {
                    "destinationName": "Visit Website",
                    "url": ""+ObjectDocDetails[2],
                  },
                  suggestions: [
                    {
                      "title": searchword
                    },
                    {
                      "title": "Cancel"
                    }
                  ]
          
                }
              }
            };
          }
      
          
          return res.json({
            payload: speechResponse,
            //data: speechResponse,
            fulfillmentText: speech,
            speech: speech,
            displayText: speech,
            source: "webhook-echo-sample"
          });
        }

        if(Contexts.parameters.OPTION.includes("Backup")){
          ObjectDocDetails = Contexts.parameters.OPTION.split(" ")
          console.log("Objecet details : "+ ObjectDocDetails)
          var theSpecialty = ObjectDocDetails[1];
          var Will = ObjectDocDetails[2]
          var  MatchobjSpec ;var  MatchobjServ;var bmSpec;var bmServ;var  MatchobjWil;
          if(lang == "en"){
              MatchobjSpec =  getmatchObject(theSpecialty.toLowerCase(),SpecialtyEn)
            // console.log("this is list of all spec : "+ JSON.stringify(MatchobjSpec))
              MatchobjServ =  getmatchObject(theSpecialty.toLowerCase(),TheWordsEn)
             bmSpec = MatchobjSpec.Matches.bestMatch;
             bmServ = MatchobjServ.Matches.bestMatch;
              MatchobjWil =  getmatchObject(Will,WilayaEn)
          }else{
              MatchobjSpec =  getmatchObject(theSpecialty.toLowerCase(),Speciality)
            // console.log("this is list of all spec : "+ JSON.stringify(MatchobjSpec))
                     MatchobjServ =  getmatchObject(theSpecialty.toLowerCase(),TheWords)
                    bmSpec = MatchobjSpec.Matches.bestMatch;
                    bmServ = MatchobjServ.Matches.bestMatch;
              MatchobjWil =  getmatchObject(Will,Wilaya)
          }
          var  MatchobjWil =  getmatchObject(Will,Wilaya)
          var bmWil = MatchobjWil.Matches.bestMatch;
          VarWiltemp = bmWil.target;
          var NumberofPages ;
          console.log('this is the saved search value inside : '+ VarWiltemp)
     
          var IndexSpec = ValueSpec[MatchobjSpec.Matches.bestMatchIndex];
          var IndiceServ;
          var IndexWil = MatchobjWil.Matches.bestMatchIndex;
          console.log('rating of Spec: '+ bmSpec.rating + " Specialty is : "+ bmSpec.target )
          console.log('Index wil : '+bmWil.target + " is : "+ IndexWil + ' and specialty : '+ bmSpec.target+ " "+IndexSpec)
          console.log("Service : "+ bmServ.target+ " rating : "+ bmServ.rating)
  
          if(bmSpec.rating> bmServ.rating){
            VarSpectemp = bmSpec.target;
              var url2= 'https://sihhatech.com/etablissements?name='+'&speciality='+IndexSpec+'&wilaya='+IndexWil
  
            }
            else{
              VarSpectemp = bmServ.target;
              IndiceServ = TheValues[MatchobjServ.Matches.bestMatchIndex];
             
              var url2= 'https://sihhatech.com/etablissements?name='+'&service='+IndiceServ+'&wilaya='+IndexWil
  
            }
           console.log('the link : '+ url2)
           axios(url2)
           .then(response => {
             const html = response.data;
             const $ = cheerio.load(html)
             //const postsModul = $('.row')
             const mname = $('.row')
             const pie = $('.etablissement__inlist');
             const Spages = $('.page-item').text();
             const pElement = $('.pagination').text()
             var countpag = 0;
         
             $(".pagination").find('li').each(function() {
              // 
              if(countpag == $(".pagination").find('li').length-2){
                var $this = $(this);
              //  console.log('the Value of PNUM : '+ $this.text() )
                NumberofPages = Number($this.text());
                if(NumberofPages >1){
                  NumberofPages = 20*Number($this.text());
                }
                
              }
                countpag++;
              
              //var $this = $(this);
            // console.log('this is Spages 2: '+$this.text()+ ' annd counter : '+ countpag)
  
          
            
            })
         
      
             console.log('Mname length: '+pie.length)
            // const statsTable = $('.statsTableContainer > tr');
             const topPremierLeagueScorers = [];
           //  console.log(postsModul)
           var counter = 0;
           var elements = [];
           var DoctorsNumber;
           var ListofAddresses = [];
           var ListofUrls  = [];
           var ListofNumbers = [];
           var ListofNames = [];
           var nn = $('.link').text()
           var npart = $('.link')
           var roww = $('.address').text()
           var plink ="https://i.imgur.com/JIARaOF.png";
     
       //    var parts = nn.split('Dr.');
           var NameofDoc;
        if(pie.length>0){
          pie.each(function () {
            
                   
            var address =  $(this).find('p').text();
            console.log('Address : '+address)
            var comStat =  $(this).find('h5').text();
            console.log('this is comstat : '+ comStat)
              ListofAddresses.push(address)
              var urll = $(this).find('.link').attr('href');
        //      console.log('Modname : '+urll)
              ListofUrls.push(urll)
         //     console.log(parts[counter] +'  '+ urll)
            //  ListofNames.push(parts[counter])dsfsdfdsfs
            axios(urll)
            .then(response => {
              var objDoc;
              var listofExtra = [];
              const html = response.data;
              const $ = cheerio.load(html)
              var countpag2 = 0;
              var comm =  $(".col-md-4").find('p > strong').text();
              console.log('comm : '+ comm)
               $(".content").find('li').each(function() {
                // 
               
                  var $this = $(this);
                  console.log('the Value of PNUM : '+ $this.text() )
                  listofExtra.push( $this.text())
                  
                  countpag2++;
                  
              
              
       
            
              
              })
           NameofDoc =  $(".col-md-4").find('.link').text()
             //  .each(function() {
             //    // 
             //    var $this = $(this);
               
             //   if($this.text().substring(0,3) == 'Dr.'){
               
             //   //console.log('Element : '+$this.text().split('Dr.')[1].split('د.')[0])
             //   // NameofDoc = $this.text().split('Dr.')[1].split('  ')[0];
             //   // if(!NameofDoc){
             //   //   NameofDoc = $this.text().split('د.')[1].split('  ')[0];
             //   // }
             //  }
             //  })
         
             var datalist = [];
              $(".col-md-4").find('p').each(function() {
                  
                  var $this = $(this);
                  datalist.push($this.text())
            //      console.log('this is item : '+$this.text())
                  if($this.text().substring(0,1) == '0'){
                    
                    DoctorsNumber = $this.text();
                   
             //     
                  ListofNumbers.push(DoctorsNumber)
                  }
                  if(datalist.length == 4){
                     objDoc = {
                      url : urll,
                      name : NameofDoc,
                      Numb : datalist[3],
                      com:datalist[1],
                      addres: datalist[2]+ ' ' +datalist[1],
                      specex: datalist[0],
  
                    }
                 //   console.log('WE  :'+JSON.stringify(objDoc))
                  }
                 
                  //if(count == )
  
              })
             // ListofAddresses.push(datalist)
             console.log('the number : '+ objDoc.Numb)
             console.log('The List OF EXTRAS  : '+ listofExtra)
             var DocItem =   {
              "optionInfo": {
                "key": objDoc.addres+" XXX "+objDoc.Numb +" XXX "+ objDoc.url +" XXX "+objDoc.specex+" XXX "+listofExtra,
           
                "synonyms": [
                  ""+objDoc.name,
               
               
                  
                ]
              },
              "description": objDoc.com,
              "image": {
                "url": "https://i.imgur.com/wugD3le.png",
                "accessibilityText": "Image alternate text"
              },
              "title": ""+objDoc.name
            }
            
            elements.push(DocItem)
              if(elements.length == 20 || (pie.length < 20 && elements.length == pie.length)){
          /// HERE/
               try {
                 if(!NumberofPages){
                   NumberofPages  = pie.length;
                 }
                 
                 if(elements.length > 1){
                   var Respeech ="";
                   if(lang == "en"){
                      Respeech  = "Okay , I found "+ NumberofPages + " results :"
                   }else{
                      Respeech = "Okay, J'ai trouvé "+ NumberofPages + " "+theSpecialty+ " dans "+ WilayaOrig;
                   }
                  var speechResponse = {
                    "google": {
                      "expectUserResponse": true,
                      "systemIntent": {
                        "intent": "actions.intent.OPTION",
                        "data": {
                          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                          "listSelect": {
                        //    "title": "List des "+theSpecialty+ " dans "+ WilayaOrig,
                            "items": elements,
                            
                          
                          }
                        }
                      },
                      "richResponse": {
                        "items": [
                          {
                            "simpleResponse": {
                              "textToSpeech": Respeech
                            }
                          }
                        ],
                        "linkOutSuggestion": {
                          "destinationName": "Voir+",
                          "url": ""+url2,
                        },
                        suggestions: [
                         {
                           "title": "Cancel"
                         },
                        //  {
                        //    "title": "Merci"
                        //  }
                       ]
                      }
                    }
                  }
                 }else{
                   var Respeech ="";
                   var CallWord = "Appel"
                   var searchword = "Cherchez"
                   if(lang == "en"){
                     CallWord = "Call"
                     searchword = "Thanks"
                      Respeech  = "Alright , I found 1 result that matches. Here is the available information on it: "
                   }else{
                     searchword = "Merci"
                      Respeech = "J'ai trouvé une seule Resultat, Voici Les information disponible : "
                   }
                    var speechResponse = {
                      google: {
                        expectUserResponse: false,
                        richResponse: {
                          items: [
                            {
                              simpleResponse: {
                                textToSpeech: Respeech
                              }
                            },
                            {
                              basicCard: {
                                "title": ""+objDoc.name,
                                "subtitle": ""+objDoc.specex,
                                "formattedText": ""+objDoc.addres + " \n "+ objDoc.Numb,
                                "image": {
                                  "url": "https://i.imgur.com/wugD3le.png",
                                  "accessibilityText": "This is an image of an image"
                                },
                                "buttons": [
                                  {
                                    "title": CallWord,
                                    "openUrlAction": {
                                      "url": "https://testwebviewoperation.herokuapp.com/tesst?dialnum="+objDoc.Numb
                                    }
                                  }
                                ],
                                "imageDisplayOptions": "WHITE"
                              }
                          
                            },
                           
                           
                          ],
                          linkOutSuggestion: {
                            "destinationName": "Profile/Agenda",
                            "url": ""+objDoc.url,
                          },
                          // suggestions: [
                          //   {
                          //     "title": searchword
                          //   },
                          //  //  {
                          //  //    "title": "Merci"
                          //  //  }
                          // ]
                  
                        }
                      }
                    };

                 }

              return res.json({
                  payload: speechResponse,
                  //data: speechResponse,
                  fulfillmentText: speech,
                  speech: speech,
                  displayText: speech,
                  source: "webhook-echo-sample"
                });
               } catch (error) {
                 console.log('there has been an error we caatched')
               }
                
                  return;
          //      }
              }
         //     counter++;
            //   console.log('Phone numbe : '+phoneRawText)
            //  var match = phoneRawText.match(/(\d{10})|(\d{9})$/)
            //    console.log('Phone numbe : '+match)
             }).catch(console.error);
           
             
         
   
             
        
             
             
      })
        }
           
         
           })

        }
      
      }
     
   

      break;
      case "Tutorial":
       var speech = req.body.queryResult.queryText;
       var Respeech ="";
       var Formatedtxt;
       var Formatedtxt2;
       var exmpl;
       var imgurl1;
       var imgurl2;
       if(lang == "en"){
         exmpl = "Got it";
         imgurl1= "https://i.imgur.com/pKEX7bW.png";
      //   imgurl2 = "https://i.imgur.com/UhAKRhx.png";
         Formatedtxt  = "* You can give the state number instead of the name when the assistant can't understand it. \n    *Example : \n Find me a dentist in 16 . \n (16 for algiers) \n ";
         Formatedtxt2 = "* You can directly ask Google assistant to Search saying for example : \n Hey,Google ask dz care for a dentist in algiers" 
         Respeech  ="<speak>Here's an example on how to do it.<break time=\"1\" /><p><s>First You specify the Medical Specialty or Service name.\n </s><s>Then you specify the state you want to search in</s><s>So you say for example :<break time=\"1\" /> </s><s>Find me a dentist in algiers</s></p></speak>"
       
       }else{
         exmpl = "Ok"
         Formatedtxt = "Vous pouvez dire le Numero de la wilaya au lieu de leur nom pour faciliter la reconaissance de mot \n Exemple : \n Cherchez un dentiste a 42. (42 est le numero de la wilaya de Tipaza) \n "
          Formatedtxt2 = "* Vous pouvez directement demander à l'assistant Google de rechercher en disant par exemple: \ n Ok, Google parler avec dz care pour un dentiste à alger"
         imgurl1 = "https://i.imgur.com/PUSbxcg.png";
     //    imgurl2 = "https://i.imgur.com/Hcfsk3N.png";
          Respeech = "<speak> Voici un exemple sur la façon de procéder. <break time = \"1\" /><p><s>D'abord, vous spécifiez la spécialité médicale ou le nom du service. \n </s><s> Ensuite, vous indiquez l'état dans lequel vous souhaitez chercher </s><s> Alors vous dites par exemple: <break time = \"1\"/></s><s>Trouvez-moi un dentiste à alger</s></p></speak>"
       }
      var speechResponse = {
        "google": {
          "expectUserResponse": true,
          "richResponse": {
            "items": [
              {
                "simpleResponse": {
                  "textToSpeech": Respeech,
           //       displayText : "Hahaha , not sure ."

                }
              },
              {
                "basicCard": {
                //  "title": "You can use the terms:",
                //  "subtitle": "I'm looking for..,I'm searching..,Find me..",
                  "formattedText": Formatedtxt,
                  "image": {
                    "url": imgurl1,
                    "accessibilityText": "Google assistant example image"
                  },
                  // "buttons": [
                  //   {
                  //     "title": "This is a button",
                  //     "openUrlAction": {
                  //       "url": "https://assistant.google.com/"
                  //     }
                  //   }
                  // ],
                  // "imageDisplayOptions": []
                }
              },
              // {
              //   "basicCard": {
              //   //  "title": "You can use the terms:",
              //   //  "subtitle": "I'm looking for..,I'm searching..,Find me..",
              //     "formattedText": Formatedtxt2,
              //     "image": {
              //       "url": imgurl2,
              //       "accessibilityText": "Google assistant example image"
              //     },
              //     // "buttons": [
              //     //   {
              //     //     "title": "This is a button",
              //     //     "openUrlAction": {
              //     //       "url": "https://assistant.google.com/"
              //     //     }
              //     //   }
              //     // ],
              //     // "imageDisplayOptions": []
              //   }
              // }

              
             
            ],

            suggestions: [
                {
                  "title": "Cancel"
                },
                // {
                //   "title": "Q&A"
                // }
              ]
            
           }

        } 
     
      }
      return res.json({
        payload: speechResponse,
        //data: speechResponse,
        fulfillmentText: speech,
        speech: speech,
        displayText: speech,
        source: "webhook-echo-sample"
      });
      break;
      case "MoreExp":
        var speech = req.body.queryResult.queryText;
        var Respeech ="";
        var Formatedtxt
        var imgurl = "https://i.imgur.com/ADZ9uaW.png";
        if(lang == "en"){
          imgurl= "https://i.imgur.com/ADZ9uaW.png";
          Formatedtxt  = "When you open Google Assistant, instead of saying : 'talk to dz care', you can say : \n Hey, Google Ask dz care for a cardiologist \n * Ok, Google ask dz care for a Neurologist in Blida";
           Respeech  ="Here you go:"
        
        }else{
          Formatedtxt = "Lorsque vous ouvrez l'Assistant Google, au lieu de dire: 'Parlez avec dz care', vous pouvez dire: \n Hey, Google demandez à dz care pour un cardiologue \n * Ok, Google demande à dz care un neurologue à Blida"
          imgurl = "https://i.imgur.com/4QfKtfw.png"
           Respeech = "Voici quelque exemples: "
        }
        var speechResponse = {
          "google": {
            "expectUserResponse": false,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": Respeech,
               //     displayText : "Hahaha , not sure ."
                  }
                },
                {
                  "basicCard": {
                    "title": "Exemples:",
                  //  "subtitle": "I'm looking for..,I'm searching..,Find me..",
                    "formattedText": Formatedtxt,
                    // "image": {
                    //   "url": "https://i.imgur.com/XFY4MmB.gif",
                    //   "accessibilityText": "Google assistant example image"
                    // },
                    // "buttons": [
                    //   {
                    //     "title": "This is a button",
                    //     "openUrlAction": {
                    //       "url": "https://assistant.google.com/"
                    //     }
                    //   }
                    // ],
                    // "imageDisplayOptions": []
                  }
                }
                
               
              ],
  
              // suggestions: [
              //     {
              //       "title": "More examples"
              //     },
              //     {
              //       "title": "Q&A"
              //     }
              //   ]
              
            }
  
          } 
       
        }
        return res.json({
          payload: speechResponse,
          //data: speechResponse,
          fulfillmentText: speech,
          speech: speech,
          displayText: speech,
          source: "webhook-echo-sample"
        });
      break;
      case "Par commune":
        // var speech = req.body.queryResult.queryText;
        // console.log('Value commune : '+ VarWiltemp)
        // var ComList = [];
        // var elements = [];
        // if(VarWiltemp){
        //   switch (VarWiltemp) {
        //     case "Alger":
        //       ComList = communeAlger;
        //       ComList.forEach(elem => {
        //         var DocItem =   {
        //           "optionInfo": {
        //             "key": "Alger "+elem.name+ " "+ elem.value+ " "+VarSpectemp,
               
        //             "synonyms": [
        //               ""+elem.name,
                   
                   
                      
        //             ]
        //           },
        //           "description": "Alger Pour : "+ VarSpectemp,
        //           "image": {
        //             "url": "https://i.imgur.com/DcioSES.png",
        //             "accessibilityText": "Image alternate text"
        //           },
        //           "title": ""+elem.name
        //         }
                
        //         elements.push(DocItem)
        //         if(elements.length == ComList.length){
        //           var Respeech ="";
        //           if(lang == "en"){
        //              Respeech  = "Here you go :"
        //           }else{
        //              Respeech = "Voici Les commune en "+ VarWiltemp
        //           }
        //          var speechResponse = {
        //            "google": {
        //              "expectUserResponse": true,
        //              "systemIntent": {
        //                "intent": "actions.intent.OPTION",
        //                "data": {
        //                  "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
        //                  "listSelect": {
        //                    "title": "Commune : ",
        //                    "items": elements,
                           
                         
        //                  }
        //                }
        //              },
        //              "richResponse": {
        //                "items": [
        //                  {
        //                    "simpleResponse": {
        //                      "textToSpeech": Respeech
        //                    }
        //                  }
        //                ],
                      
        //                suggestions: [
        //                 {
        //                   "title": "cancel"
        //                 },
        //                //  {
        //                //    "title": "Merci"
        //                //  }
        //               ]
        //              }
        //            }
        //          }
        //          return res.json({
        //           payload: speechResponse,
        //           //data: speechResponse,
        //           fulfillmentText: speech,
        //           speech: speech,
        //           displayText: speech,
        //           source: "webhook-echo-sample"
        //         });
        //         }
        //       })
         
        //       break;
          
        //     default:
        //       break;
        //   }
        //   var speechResponse = {
        //     google: {
        //       expectUserResponse: true,
        //       richResponse: {
        //         items: [
        //           {
        //             simpleResponse: {
        //               textToSpeech: "Respeech"
        //             }
        //           },
                  
                 
                 
        //         ],
               
        //         suggestions: [
        //           {
        //             "title": "searchword"
        //           },
        //           // {
        //           //   "title": "Merci"
        //           // }
        //         ]
        
        //       }
        //     }
        //   };
        // }else{
        //   var speechResponse = {
        //     google: {
        //       expectUserResponse: true,
        //       richResponse: {
        //         items: [
        //           {
        //             simpleResponse: {
        //               textToSpeech: "Respeech"
        //             }
        //           },
        //           {
        //             basicCard: {
        //               "title": "Name",
        //               "subtitle": "Subtitle",
        //               "formattedText": "More formated text yo",
        //               "image": {
        //                 "url": "https://i.imgur.com/DcioSES.png",
        //                 "accessibilityText": "This is an image of an image"
        //               },
        //               // "buttons": [
        //               //   {
        //               //     "title": "Appel",
        //               //     "openUrlAction": {
        //               //       "url": "https://testwebviewoperation.herokuapp.com/tesst"
        //               //     }
        //               //   }
        //               // ],
        //               "imageDisplayOptions": "WHITE"
        //             }
                  
        //           },
                 
                 
        //         ],
               
        //         suggestions: [
        //           {
        //             "title": "searchword"
        //           },
        //           // {
        //           //   "title": "Merci"
        //           // }
        //         ]
        
        //       }
        //     }
        //   };
        // }
       
      
  
      
      // return res.json({
      //   payload: speechResponse,
      //   //data: speechResponse,
      //   fulfillmentText: speech,
      //   speech: speech,
      //   displayText: speech,
      //   source: "webhook-echo-sample"
      // });
        break;
    default:
      break;
  }



} catch (error) {

  console.log('this is the error : '+ error)
  var speechResponse = {

    "google": {
      "expectUserResponse": false,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": "I apologize for this, but something went wrong",
             // "displayText": "Well, not much text is it ?"
            }
          }
        ]
      }
    }
  }
    return res.json({
        payload: speechResponse,
        //data: speechResponse,
        fulfillmentText: speech,
        speech: speech,
        displayText: speech,
        source: "webhook-echo-sample"
      });
}
 


})

app.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
function getmatchObject(word,list){

  var matches = stringSimilarity.findBestMatch(word, list);
//initialize an empty array to store similar strings
      
   
          var getSimilar = [];
          matches.ratings.forEach(ch => {
       //     console.log('the value : '+ch.rating)
            if(parseFloat(ch.rating).toFixed(2) > 0.50){
          //   console.log('loop ; '+ch.target)
            getSimilar.push(ch.target);
    }
          })
    // for(var i in matches.ratings){
  
var MatchObject = {
Matches : matches,
BestmatchWord :  getSimilar,
}
return MatchObject;
}

