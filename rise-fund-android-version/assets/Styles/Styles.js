import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 300,
    marginTop: 20,
    marginBottom: -50,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  signInBox: {
    width: '80%',
    padding: 20,
    backgroundColor: '#A7D7C5', 
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  signUpBox: {
    width: '80%',
    padding: 20,
    backgroundColor: '#A7D7C5', 
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 70,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#FFF',
  },
  button: {
    width: '60%',
    height: 40,
    backgroundColor: '#A3C9F2', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
  },

  // Estilos para la pantalla HomeScreen
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#C3E4DD', 
  },
  infoBox: {
    width: '70%', 
    backgroundColor: '#A7D7C5',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center', 
  },
  infoLabel: {
    fontSize: 18,
    color: '#333',
  },
  infoValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },

  // Estilos para la pantalla CreatorMenuScreen
  projectCard: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  projectInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  projectText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  progressContainer: {
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  detailsButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#A7D7C5',
    borderRadius: 5,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  newProjectButton: {
    width: '80%',
    padding: 15,
    backgroundColor: '#A7D7C5',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  newProjectButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exploreTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  
  searchContainer: {
    flexDirection: 'row',
    width: '90%',
    marginBottom: 15,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  searchButton: {
    height: 40,
    marginLeft: 10,
    paddingHorizontal: 15,
    backgroundColor: '#A7D7C5',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },

  // Estilos para la pantalla NewProjectScreen
  containerNewProject: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  titleNewProject: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  labelNewProject: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },

  inputNewProject: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },

  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: 'center',
  },

  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },

  saveButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Estilos de los filtros con Picker
  filterContainer: {
    flexDirection: 'column', 
    width: '90%',
    marginBottom: 15,
  },
  pickerContainer: {
    width: '100%', 
    minWidth: 150, 
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 5,
  },
  picker: {
    width: '100%',
    minWidth: 150, 
    color: '#333',
  },
  aboutContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  aboutContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'justify',
    marginHorizontal: 10,
  },
  // Estilos para la pantalla Forums
  forumContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    alignItems: 'center', 
  },
  forumTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  forumCard: {
    width: '90%',
    maxWidth: 400,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 20,
    flexDirection: 'column',
    alignSelf: 'center', 
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userIcon: {
    fontSize: 20,
    marginRight: 8,
    color: '#333',
  },
  userText: {
    fontSize: 16,
    color: '#333',
  },
  forumContent: {
    marginBottom: 10,
  },
  forumPostTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  forumDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  viewButtonContainer: {
    alignSelf: 'flex-end',
    marginTop: 10,
    backgroundColor: '#A7D7C5',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  // Project Details Styles
  projectBox: {
    width: '100%',
    padding: 20,
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#FFFFFF', 
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  ratingBox: {
    width: '100%',
    padding: 20,
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#A7D7C5', 
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  projectDescription: {
        color: 'black', // Color de texto negro
        textAlign: 'justify', // Justificar el texto
        padding: 10, // Padding de 10 unidades
        fontSize: 16, // Puedes ajustar el tamaño de la fuente según sea necesario
    },

  //Genericos
  genericBox: {
    width: '80%',
    padding: 20,
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#A7D7C5', 
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  
});
export default styles;
// En Styles.js

// Estilos exclusivos para ADMINISTATOR_Menu_View.js
const adminStyles = {
  adminContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,   // Espaciado vertical
    backgroundColor: '#F0F4F8',
  },
  adminTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  adminBox: {
    backgroundColor: '#C8E6C9',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    alignItems: 'center',
    width: '95%',
  },
  adminRegisterTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  adminInfoBox: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    marginBottom: 12,
    width: '100%',
  },
  adminInfoText: {
    textAlign: 'center',
    fontSize: 16,
  },
  adminButton: {
    backgroundColor: '#64B5F6',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  adminButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  alertButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
  },
  alertButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  refreshButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
  },
  refreshButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
};
export { adminStyles };