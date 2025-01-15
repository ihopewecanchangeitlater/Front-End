import React, { useState, useEffect } from "react";
import { getCarById, updateCarQuantity, buyCar } from "../Services/api";
import { useNavigate } from "react-router-dom";

const CarPage = ({ isAgent, carId }) => {
  const [car, setCar] = useState(null); // Πληροφορίες αυτοκινήτου
  const [quantity, setQuantity] = useState(0); // Τρέχουσα ποσότητα από τη βάση
  const [newQuantity, setNewQuantity] = useState(0); // Τοπική ποσότητα για εισαγωγή
  const [testDriveCars, setTestDriveCars] = useState(0); // Αριθμός αυτοκινήτων σε test drive
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await getCarById(carId);
        setCar(response.data);
        setQuantity(response.data.quantity); // Τρέχουσα ποσότητα
        setNewQuantity(response.data.quantity); // Τοπική ποσότητα αρχικά ίδια με την τρέχουσα
      } catch (error) {
        console.error("Error fetching car:", error);
      }
    };

    fetchCar();
  }, [carId]);

  // Ενημέρωση ποσότητας αυτοκινήτων στην βάση
  const handleUpdateQuantity = async () => {
    try {
      await updateCarQuantity(carId, { quantity: newQuantity });
      setQuantity(newQuantity); // Ενημέρωση της τρέχουσας ποσότητας μόνο μετά την επιτυχή αποστολή
      alert("Quantity updated successfully!");
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Λειτουργία Test Drive (παίρνει ΜΟΝΟ ένα αμάξι για test drive)
  const handleTestDrive = () => {
    if (testDriveCars > 0) {
      alert("You can only have one car for a test drive at a time!");
      return;
    }
  
    // Θα μπει το αμάξι σε μια λίστα με αυτοκίνητα που είναι σε test drive
    // Αφαιρείται από την ποσότητα των διαθέσιμων αυτοκινήτων
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setTestDriveCars(testDriveCars + 1);
      alert("Car added to test drive list!");
    } else {
      alert("No cars available for test drive!");
    }
  };
  
  // Αγορά αυτοκινήτου (μείωση της ποσότητας κατά 1)
  // Εάν έχει αυτοκίνητο σε test drive, δεν μπορεί να αγοράσει άλλο
  const handleBuyCar = async () => {
    if (testDriveCars > 0) {
      alert("You must return the test drive car before buying!");
      return;
    }
  
    if (quantity > 0) {
      try {
        await buyCar(carId);
        setQuantity(quantity - 1); // Μείωση της ποσότητας κατά 1
        alert("Car bought successfully!");
      } catch (error) {
        console.error("Error buying car:", error);
      }
    } else {
      alert("No cars available for purchase!");
    }
  };
  
  // Επιστροφή αμαξιού από test drive
  const handleCarReturn = () => {
    if (testDriveCars > 0) {
      setQuantity(quantity + 1);
      setTestDriveCars(testDriveCars - 1);
      alert("Car returned successfully!");
    } else {
      alert("No cars to return!");
    }
  };
  

  const handleCancel = () => {
    navigate("/"); // Επιστροφή στο Dashboard (όταν έχει κάτι να επιστρέψει)
  };

  if (!car) return <p>Loading...</p>;

  // Εδώ προστέθηκε Talwind CSS
  return (
    <div className="flex flex-col md:flex-row gap-4 p-6 bg-gray-100 min-h-screen">
      {/* Πληροφορίες Αυτοκινήτου */}
      <div className="bg-beige-200 p-4 rounded-lg shadow-md flex-grow">
        <h1 className="text-2xl font-bold">
          {car.brand} {car.model}
        </h1>
        <p>Fuel Type: {car.fuelType}</p>
        <p>Engine: {car.engine}</p>
        <p>Seats: {car.seats}</p>
        <p>Price: {car.price}</p>
        <p>Additional Info: {car.additionalInfo}</p>
        <p>Quantity: {quantity}</p>
        <p>Cars in Test Drive: {testDriveCars}</p>
      </div>

      {/* Κουμπιά */}
      <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md">
  {isAgent ? (
    <div>
      <h2 className="text-xl font-semibold mb-2">Update Quantity</h2>
      <input
        type="number"
        value={newQuantity}
        onChange={(e) => setNewQuantity(Number(e.target.value))}
        className="border p-2 rounded-md w-full mb-2"
      />
      <button
        onClick={handleUpdateQuantity}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        OK
      </button>
    </div>
  ) : (
    <div>
      <button
        onClick={handleBuyCar}
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Buy
      </button>
      <button
        onClick={handleTestDrive}
        className="bg-yellow-500 text-white px-4 py-2 rounded-md"
      >
        Test Drive
      </button>
    </div>
  )}

  {/* Εμφάνιση του κουμπιού Car Return μόνο αν δεν είναι agent */}
  {!isAgent && (
    <button
      onClick={handleCarReturn}
      className="bg-gray-500 text-white px-4 py-2 rounded-md"
    >
      Car Return
    </button>
  )}

  <button
    onClick={handleCancel}
    className="bg-red-500 text-white px-4 py-2 rounded-md"
  >
    Άκυρο
  </button>
</div>

    </div>
  );
};

export default CarPage;
