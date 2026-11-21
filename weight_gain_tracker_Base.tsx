// ... existing code ... ...
import React, { useState, useEffect, useMemo } from 'react';

// --- INLINE SVG ICON COMPONENTS (Replaces lucide-react dependencies) ---
const BarChart2 = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const Scale = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1zM2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1zM7 21h10M12 3v18M3 7h18" />
  </svg>
);

const Utensils = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M18 2v20M21 15V2v0a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3zM3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20" />
  </svg>
);

const Flame = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z" />
  </svg>
);

const Target = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const Plus = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const Trash2 = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const Check = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ChevronDown = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ChevronUp = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const TrendingUp = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);

const Activity = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const History = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" />
  </svg>
);

const Edit2 = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

const X = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronRight = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// --- INITIAL INGREDIENTS DATA FOR PRE-SET 7 MEALS ---
const initialMealsData = [
  {
    id: 'meal_1',
    name: 'Meal 1: Tea + Dhokla',
    time: '07:30 AM',
    eaten: false,
    ingredients: [
      { id: 'm1_1', name: 'Tea + Dhokla', calories: 235, protein: 6, carbs: 32, fat: 9, selected: true }
    ]
  },
  {
    id: 'meal_2',
    name: 'Meal 2: Mass-Gainer Shake',
    time: '09:00 AM',
    eaten: false,
    ingredients: [
      { id: 'm2_1', name: 'Mass Gainer Powder', calories: 132, protein: 5, carbs: 16, fat: 6, selected: true },
      { id: 'm2_2', name: 'Banana', calories: 105, protein: 1, carbs: 27, fat: 0, selected: true },
      { id: 'm2_3', name: 'Milk', calories: 150, protein: 7, carbs: 11, fat: 8, selected: true },
      { id: 'm2_4', name: 'Peanut Butter', calories: 95, protein: 4, carbs: 3, fat: 8, selected: true }
    ]
  },
  {
    id: 'meal_3',
    name: 'Meal 3: Salad',
    time: '11:30 AM',
    eaten: false,
    ingredients: [
      { id: 'm3_1', name: 'Chana', calories: 41, protein: 2, carbs: 7, fat: 1, selected: true },
      { id: 'm3_2', name: 'Sprouts', calories: 8, protein: 1, carbs: 2, fat: 0, selected: true },
      { id: 'm3_3', name: 'Curd', calories: 24, protein: 1, carbs: 2, fat: 1, selected: true },
      { id: 'm3_4', name: 'Peanuts', calories: 85, protein: 4, carbs: 2, fat: 7, selected: true }
    ]
  },
  {
    id: 'meal_4',
    name: 'Meal 4: Lunch Options',
    time: '01:30 PM',
    eaten: false,
    ingredients: [
      { id: 'm4_1', name: 'Roti + Sabji', calories: 350, protein: 11, carbs: 52, fat: 10, selected: true },
      { id: 'm4_2', name: 'Roti + Meat', calories: 450, protein: 25, carbs: 48, fat: 18, selected: false },
      { id: 'm4_3', name: 'Roti + Chicken', calories: 408, protein: 30, carbs: 45, fat: 12, selected: false }
    ]
  },
  {
    id: 'meal_5',
    name: 'Meal 5: Calorie Booster',
    time: '03:00 PM to 06:00 PM',
    eaten: false,
    ingredients: [
      { id: 'm5_1', name: 'Egg', calories: 78, protein: 6, carbs: 1, fat: 5, selected: true },
      { id: 'm5_2', name: 'Gond laddu', calories: 190, protein: 3, carbs: 23, fat: 10, selected: true },
      { id: 'm5_3', name: 'Ragi sheera', calories: 180, protein: 3, carbs: 27, fat: 7, selected: true },
      { id: 'm5_4', name: 'Soya Chunks', calories: 103, protein: 16, carbs: 10, fat: 0, selected: true }
    ]
  },
  {
    id: 'meal_6',
    name: 'Meal 6: Dinner Options',
    time: '08:30 PM',
    eaten: false,
    ingredients: [
      { id: 'm6_1', name: 'Khichdi + Sabji', calories: 485, protein: 13, carbs: 72, fat: 16, selected: true },
      { id: 'm6_2', name: 'Khichdi + Meat', calories: 600, protein: 28, carbs: 70, fat: 25, selected: false },
      { id: 'm6_3', name: 'Khichdi + Chicken', calories: 520, protein: 29, carbs: 38, fat: 25, selected: false }
    ]
  },
  {
    id: 'meal_7',
    name: 'Meal 7: Recovery Milk',
    time: 'Bedtime',
    eaten: false,
    ingredients: [
      { id: 'm7_1', name: 'Milk', calories: 150, protein: 7, carbs: 11, fat: 8, selected: true },
      { id: 'm7_2', name: 'Powder', calories: 132, protein: 5, carbs: 16, fat: 6, selected: true }
    ]
  }
];

const getLocalDateString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const makeMealDaySnapshot = (mealList) => ({
  meals: mealList.map(meal => ({
    id: meal.id,
    eaten: Boolean(meal.eaten),
    ingredients: meal.ingredients.map(ing => ({ id: ing.id, selected: Boolean(ing.selected) }))
  }))
});

const applyMealDaySnapshot = (mealDefinitions, snapshot) => {
  if (!snapshot || !Array.isArray(snapshot.meals)) {
    return mealDefinitions.map(meal => {
      const originalMeal = initialMealsData.find(item => item.id === meal.id);
      return {
        ...meal,
        eaten: false,
        ingredients: meal.ingredients.map(ing => {
          const originalIngredient = originalMeal?.ingredients.find(item => item.id === ing.id);
          return { ...ing, selected: originalIngredient ? Boolean(originalIngredient.selected) : true };
        })
      };
    });
  }
  const savedMeals = new Map(snapshot.meals.map(meal => [meal.id, meal]));
  return mealDefinitions.map(meal => {
    const savedMeal = savedMeals.get(meal.id);
    const savedIngredients = new Map((savedMeal?.ingredients || []).map(ing => [ing.id, ing]));
    const originalMeal = initialMealsData.find(item => item.id === meal.id);
    return {
      ...meal,
      eaten: savedMeal ? Boolean(savedMeal.eaten) : false,
      ingredients: meal.ingredients.map(ing => {
        const originalIngredient = originalMeal?.ingredients.find(item => item.id === ing.id);
        return {
          ...ing,
          // A date with no saved checklist starts from the original preset selection,
          // while newly added ingredients start selected.
          selected: savedIngredients.has(ing.id)
            ? Boolean(savedIngredients.get(ing.id).selected)
            : (originalIngredient ? Boolean(originalIngredient.selected) : true)
        };
      })
    };
  });
};

const calculateMealTotals = (mealList) => mealList.reduce((totals, meal) => {
  if (!meal.eaten) return totals;
  meal.ingredients.forEach(ing => {
    if (ing.selected) {
      totals.calories += Number(ing.calories) || 0;
      totals.protein += Number(ing.protein) || 0;
      totals.carbs += Number(ing.carbs) || 0;
      totals.fat += Number(ing.fat) || 0;
    }
  });
  return totals;
}, { calories: 0, protein: 0, carbs: 0, fat: 0 });


// Nutrition-based weight prediction: use only days with recorded intake; missing days are not treated as zero.
const buildTheoreticalSeries = (nutritionLogs, profile, maintenanceCalories, weightLogs = []) => {
  const startWeight = Number(profile.startWeight || 0);
  const inferredStartDate = [
    ...(Array.isArray(weightLogs) ? weightLogs.map(log => log.date) : []),
    ...(Array.isArray(nutritionLogs) ? nutritionLogs.map(log => log.date) : [])
  ].filter(Boolean).sort()[0] || '';
  const startDate = profile.startingDate || inferredStartDate;
  if (!startWeight || !startDate || !maintenanceCalories || !Array.isArray(nutritionLogs)) return [];
  const byDate = new Map();
  nutritionLogs.forEach(log => {
    if (!log?.date || log.date < startDate) return;
    // Prefer meal-generated totals for a date when present; otherwise use its manual entry.
    const existing = byDate.get(log.date);
    if (!existing || log.source === 'manual' || (log.source === 'meals' && existing.source !== 'manual')) byDate.set(log.date, log);
  });
  const sorted = Array.from(byDate.values()).sort((a,b) => a.date.localeCompare(b.date));
  let cumulative = 0;
  return sorted.map(log => {
    cumulative += (Number(log.calories || 0) - maintenanceCalories);
    return { date: log.date, weight: startWeight + cumulative / 7700, calories: Number(log.calories || 0) };
  });
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const [profile, setProfile] = useState(() => {
    // Clear the old demonstration profile and logs once after this update.
    // Deliberately preserve wg_meals so all seven preset meals remain unchanged.
    if (localStorage.getItem('wg_clean_start_v1') !== 'done') {
      localStorage.removeItem('wg_profile');
      localStorage.removeItem('wg_nutrition_logs');
      localStorage.removeItem('wg_weight_logs');
      localStorage.setItem('wg_clean_start_v1', 'done');
    }
    const saved = localStorage.getItem('wg_profile');
    return saved ? JSON.parse(saved) : {
      gender: '',
      breastfeeding: '',
      startingDate: '',
      startWeight: '',
      currentWeight: '',
      targetWeight: '',
      height: '',
      age: '',
      activityLevel: '',
      surplusGoal: '',
    };
  });

  const [meals, setMeals] = useState(() => {
    const saved = localStorage.getItem('wg_meals');
    let mealDefinitions = initialMealsData;
    if (saved) {
      try { mealDefinitions = JSON.parse(saved) || initialMealsData; } catch { mealDefinitions = initialMealsData; }
    }
    // On refresh, always open today's checklist rather than whichever date was last viewed.
    const savedDailyLogs = localStorage.getItem('wg_meal_daily_logs');
    if (savedDailyLogs) {
      try {
        const dailyLogs = JSON.parse(savedDailyLogs) || {};
        if (dailyLogs[getLocalDateString()]) {
          return applyMealDaySnapshot(mealDefinitions, dailyLogs[getLocalDateString()]);
        }
      } catch { /* Fall back to a fresh skipped checklist below. */ }
    }
    return applyMealDaySnapshot(mealDefinitions, null);
  });

  const [selectedMealDate, setSelectedMealDate] = useState(() => getLocalDateString());
  const [mealDailyLogs, setMealDailyLogs] = useState(() => {
    const savedDailyLogs = localStorage.getItem('wg_meal_daily_logs');
    if (savedDailyLogs) {
      try { return JSON.parse(savedDailyLogs) || {}; } catch { return {}; }
    }
    // Migration: dates without a date-specific checklist start Skipped, even if an older
    // version stored a global eaten status in wg_meals. Ingredient presets remain intact.
    const savedMeals = localStorage.getItem('wg_meals');
    let currentMeals = initialMealsData;
    if (savedMeals) {
      try { currentMeals = JSON.parse(savedMeals) || initialMealsData; } catch { currentMeals = initialMealsData; }
    }
    const skippedToday = applyMealDaySnapshot(currentMeals, null);
    return { [getLocalDateString()]: makeMealDaySnapshot(skippedToday) };
  });

  const [nutritionLogs, setNutritionLogs] = useState(() => {
    const saved = localStorage.getItem('wg_nutrition_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [weightLogs, setWeightLogs] = useState(() => {
    const saved = localStorage.getItem('wg_weight_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedNutritionMonth, setSelectedNutritionMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  });

  const [selectedWeightMonth, setSelectedWeightMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  });

  const [isNutritionModalOpen, setIsNutritionModalOpen] = useState(false);
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
  const [expandedMealId, setExpandedMealId] = useState('meal_1');
  const [profileSavedFeedback, setProfileSavedFeedback] = useState(false);
  const [mealSavedFeedback, setMealSavedFeedback] = useState(false);

  // --- LOCAL EDIT FORM FOR PROFILE TO PREVENT DRIFT ON REFRESH ---
  const [tempProfile, setTempProfile] = useState(() => ({ ...profile }));

  // Keep local temp form synced if profile is updated externally
  useEffect(() => {
    setTempProfile({ ...profile });
  }, [profile]);

  // --- INGREDIENT EDIT/ADD MODAL STATES ---
  const [editingIngredient, setEditingIngredient] = useState(null); // { mealId, ingredient } or null
  const [ingredientForm, setIngredientForm] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });

  const [nutritionForm, setNutritionForm] = useState({
    date: new Date().toISOString().split('T')[0],
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    notes: ''
  });

  const [weightForm, setWeightForm] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: profile.currentWeight || '',
    notes: ''
  });

  useEffect(() => {
    localStorage.setItem('wg_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('wg_meals', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem('wg_meal_daily_logs', JSON.stringify(mealDailyLogs));
  }, [mealDailyLogs]);

  // Keep the selected date's checklist and its automatically calculated nutrition entry in sync.
  useEffect(() => {
    setMealDailyLogs(prev => ({ ...prev, [selectedMealDate]: makeMealDaySnapshot(meals) }));
    const totals = calculateMealTotals(meals);
    const hasEatenMeal = meals.some(meal => meal.eaten);
    setNutritionLogs(prev => {
      const withoutThisDateAutoEntry = prev.filter(log => !(log.date === selectedMealDate && log.source === 'meals'));
      if (!hasEatenMeal) return withoutThisDateAutoEntry;
      const existingAuto = prev.find(log => log.date === selectedMealDate && log.source === 'meals');
      return [{
        id: existingAuto?.id || `meals-${selectedMealDate}`,
        source: 'meals',
        date: selectedMealDate,
        calories: totals.calories,
        protein: totals.protein,
        carbs: totals.carbs,
        fat: totals.fat,
        notes: 'Automatically calculated from Meals tab'
      }, ...withoutThisDateAutoEntry];
    });
  }, [meals, selectedMealDate]);

  useEffect(() => {
    localStorage.setItem('wg_nutrition_logs', JSON.stringify(nutritionLogs));
  }, [nutritionLogs]);

  useEffect(() => {
    localStorage.setItem('wg_weight_logs', JSON.stringify(weightLogs));
  }, [weightLogs]);

  // --- DYNAMIC TARGET CALCULATIONS ---
  const calculatedTargets = useMemo(() => {
    const weight = Number(profile.currentWeight || profile.startWeight || 0);
    const height = Number(profile.height || 0);
    const age = Number(profile.age || 0);
    const activityLevel = Number(profile.activityLevel || 0);
    const surplusGoal = Number(profile.surplusGoal || 0);
    const isProfileComplete = weight > 0 && height > 0 && age > 0 && activityLevel > 0 &&
      surplusGoal >= 0 && (profile.gender === 'male' || profile.gender === 'female') &&
      (profile.breastfeeding === 'yes' || profile.breastfeeding === 'no');

    if (!isProfileComplete) {
      return { isProfileComplete: false, bmr: 0, maintenance: 0, breastfeedingAddon: 0,
        targetCalories: 0, targetProtein: 0, targetFat: 0, targetCarbs: 0 };
    }

    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if (profile.gender === 'male') bmr += 5;
    else bmr -= 161;

    const maintenance = bmr * activityLevel;
    const breastfeedingAddon = (profile.gender === 'female' && profile.breastfeeding === 'yes') ? 500 : 0;
    const targetCalories = Math.round(maintenance + surplusGoal + breastfeedingAddon);
    const proteinFactor = (profile.gender === 'female' && profile.breastfeeding === 'yes') ? 2.2 : 2.0;
    const targetProtein = Math.round(weight * proteinFactor);
    const targetFat = Math.round((targetCalories * 0.25) / 9);
    const proteinCalories = targetProtein * 4;
    const fatCalories = targetFat * 9;
    const remainingCalories = targetCalories - (proteinCalories + fatCalories);
    const targetCarbs = Math.max(0, Math.round(remainingCalories / 4));

    return { isProfileComplete: true, bmr: Math.round(bmr), maintenance: Math.round(maintenance),
      breastfeedingAddon, targetCalories, targetProtein, targetFat, targetCarbs };
  }, [profile]);

  // --- DAILY CONSUMPTION TOTALS (ONLY ADDED IF EATEN IS TRUE) ---
  const selectedMealTotals = useMemo(() => calculateMealTotals(meals), [meals]);
  const todayTotals = useMemo(() => {
    const today = getLocalDateString();
    const todayMealView = applyMealDaySnapshot(meals, mealDailyLogs[today]);
    return calculateMealTotals(todayMealView);
  }, [meals, mealDailyLogs]);

  const maintenanceForPrediction = calculatedTargets.isProfileComplete
    ? calculatedTargets.maintenance + calculatedTargets.breastfeedingAddon
    : 0;
  const theoreticalSeries = useMemo(() => buildTheoreticalSeries(nutritionLogs, profile, maintenanceForPrediction, weightLogs),
    [nutritionLogs, profile, maintenanceForPredi
