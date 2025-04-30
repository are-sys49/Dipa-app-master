import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  SafeAreaView,
  Modal,
  Dimensions,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Obtener dimensiones de la pantalla para cálculos responsivos
const { width, height } = Dimensions.get('window');

export default function App() {
  // Estado para controlar qué tarjeta está seleccionada
  const [selectedCard, setSelectedCard] = useState(null);
  
  // Datos de los cursos disponibles
  const courses = [
    {
      id: 1,
      title: "Animales peligrosos",
      icon: "🕷️",
      color: "#1a397c",
      details: {
        description: "Aprende a identificar, prevenir y actuar ante encuentros con animales venenosos o agresivos. ¡Protege tu vida y la de los demás como un verdadero DPA lover!",
        modality: "PRESENCIAL",
        duration: "4 HORAS",
        location: "SEDE: GUADALAJARA",
        callToAction: "¡Quiero inscribirme!"
      }
    },
    { id: 2, title: "Curso 2", icon: "🦊", color: "#4a8f29" },
    { id: 3, title: "Curso 3", icon: "🦁", color: "#c94121" },
    { id: 4, title: "Curso 4", icon: "🐊", color: "#8a21c9" },
    { id: 5, title: "Curso 5", icon: "🐘", color: "#21a9c9" },
    { id: 6, title: "Curso 6", icon: "🦅", color: "#c9b321" },
  ];

  // Función para manejar el click en una tarjeta
  const handleCardPress = (courseId) => {
    setSelectedCard(courseId);
  };

  // Función para cerrar el detalle del curso
  const closeCardDetail = () => {
    setSelectedCard(null);
  };

  // Componente para renderizar una tarjeta de curso
  const CourseCard = ({ course, onPress }) => (
    <TouchableOpacity
      style={[
        styles.card,
        course.id === 1 && styles.highlightedCard
      ]}
      onPress={() => onPress(course.id)}
      activeOpacity={0.8}
    >
      <Text style={styles.cardTitle}>{course.title}</Text>
      <Text style={styles.cardIcon}>{course.icon}</Text>
    </TouchableOpacity>
  );

  // Componente para renderizar el detalle de un curso
  const CourseDetail = ({ course, onClose }) => {
    if (!course || !course.details) return null;
    
    return (
      <View style={[styles.detailCard, { backgroundColor: course.color }]}>
        <View style={styles.detailCardHeader}>
          <Text style={styles.detailCardTitle}>
            {course.title}
          </Text>
          <Text style={styles.detailCardSubtitle}>
            Intervenciones oportunas
          </Text>
        </View>
        
        <View style={styles.detailCardBody}>
          <Text style={styles.detailCardDescription}>
            {course.details.description}
          </Text>
          
          <View style={styles.detailCardFeatures}>
            <View style={styles.featureBox}>
              <Text style={styles.featureText}>{course.details.modality}</Text>
            </View>
            <View style={styles.featureBox}>
              <Text style={styles.featureText}>{course.details.duration}</Text>
            </View>
          </View>
          
          <Text style={styles.locationText}>{course.details.location}</Text>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>{course.details.callToAction}</Text>
          </TouchableOpacity>
          
          <Text style={styles.footerNote}>
            Este taller incluye contenido teórico con valor curricular, debidamente avalado en constancia digital por el Instituto DPA.
          </Text>
          <Text style={styles.footerNote}>
            Consulta en WhatsApp el próximo ciclo de cursos.
          </Text>
        </View>
        
        <View style={styles.scanSection}>
          <View style={styles.cameraIcon}>
            <Ionicons name="camera-outline" size={24} color="#0099cc" />
          </View>
          <Text style={styles.scanText}>
            Mantén activa tu ruta de aprendizaje. Escanea el código ahora.
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.closeButton}
          onPress={onClose}
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  // Obtener el curso seleccionado
  const selectedCourseObj = courses.find(c => c.id === selectedCard);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#666" />
        </TouchableOpacity>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#6ab04c' }]}>
              <Text>!</Text>
            </View>
            <Text style={styles.statValue}>1</Text>
          </View>
          
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#3498db' }]}>
              <Ionicons name="person" size={16} color="white" />
            </View>
            <Text style={styles.statValue}>0</Text>
          </View>
          
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#e17055' }]}>
              <Ionicons name="flame" size={16} color="white" />
            </View>
            <Text style={styles.statValue}>1</Text>
          </View>
          
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#6c5ce7' }]}>
              <Ionicons name="paw" size={16} color="white" />
            </View>
            <Text style={styles.statValue}>5</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>
      
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Cursos y Talleres</Text>
      </View>
      
      {/* Mascot */}
      <View style={styles.mascotContainer}>
        <Image 
          source={{ uri: 'https://i.imgur.com/JNWP9nm.png' }} 
          style={styles.mascotImage} 
        />
        <View style={styles.speechBubble}>
          <Text style={styles.speechBubbleText}>
            "¡Ruge con conocimiento! {"\n"}
            Un león bien capacitado siempre {"\n"}
            está un paso adelante.
          </Text>
        </View>
      </View>
      
      {/* Course Cards Grid */}
      <View style={styles.cardsContainer}>
        <ScrollView contentContainerStyle={styles.cardsGrid}>
          {courses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onPress={handleCardPress} 
            />
          ))}
        </ScrollView>
      </View>
      
      {/* Modal para tarjeta detallada */}
      <Modal
        visible={selectedCard !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={closeCardDetail}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedCourseObj && 
              <CourseDetail 
                course={selectedCourseObj} 
                onClose={closeCardDetail} 
              />
            }
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  settingsButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    marginLeft: 3,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  titleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  mascotContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  mascotImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  speechBubble: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 10,
    marginLeft: 10,
  },
  speechBubbleText: {
    color: '#1a397c',
    fontSize: 14,
    fontWeight: '500',
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  card: {
    width: (width - 60) / 2,
    height: (width - 60) / 2,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    marginBottom: 20,
    padding: 15,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  highlightedCard: {
    borderColor: '#1a397c',
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardIcon: {
    fontSize: 32,
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailCard: {
    width: '100%',
    backgroundColor: '#1a397c',
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailCardHeader: {
    width: '100%',
    padding: 20,
    alignItems: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  detailCardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  detailCardSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  detailCardBody: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginTop: -10,
  },
  detailCardDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 20,
  },
  detailCardFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  featureBox: {
    backgroundColor: '#1a397c',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  featureText: {
    color: 'white',
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 15,
    textAlign: 'center',
  },
  actionButton: {
    backgroundColor: '#1a397c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 15,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerNote: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  scanSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: '100%',
  },
  cameraIcon: {
    marginRight: 10,
  },
  scanText: {
    fontSize: 12,
    color: '#0099cc',
    flex: 1,
  },
});
