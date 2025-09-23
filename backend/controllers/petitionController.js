import Petition from "../models/Petition.js";
import User from "../models/User.js";

export const createPetition = async (req, res) => {
  const { title, description, category, signatureGoal } = req.body;

  try {
    const user = await User.findById(req.user.id);

    const newPetition = new Petition({
      title,
      description,
      category,
      location: user.location, // Automatically use the logged-in user's location
      goal: signatureGoal,
      owner: req.user.id, // req.user.id comes from your auth middleware
    });

    const savedPetition = await newPetition.save();
    res.status(201).json(savedPetition);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get all petitions
// @route   GET /api/petitions
export const getPetitions = async (req, res) => {
  try {
    const petitions = await Petition.find({})
      .sort({ createdAt: -1 })
      .populate("owner", "name");
    res.json(petitions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Sign a petition
// @route   POST /api/petitions/:id/sign
export const signPetition = async (req, res) => {
  try {
    const petition = await Petition.findById(req.params.id);

    if (petition) {
      if (petition.signatures.includes(req.user.id)) {
        return res
          .status(400)
          .json({ message: "You have already signed this petition" });
      }

      petition.signatures.push(req.user.id);
      const updatedPetition = await petition.save();
      res.json(updatedPetition);
    } else {
      res.status(404).json({ message: "Petition not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
