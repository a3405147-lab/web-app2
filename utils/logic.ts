import { Group } from '../types';

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 */
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Generates groups based on total students and desired number of groups.
 * Distributes students round-robin style to ensure balanced group sizes.
 */
export const generateGroups = (
  totalStudents: number,
  numberOfGroups: number,
  isRandom: boolean
): Group[] => {
  if (totalStudents <= 0 || numberOfGroups <= 0) {
    return [];
  }

  // 1. Create array of student IDs [1, 2, ..., N]
  let studentIds: number[] = Array.from({ length: totalStudents }, (_, i) => i + 1);

  // 2. Shuffle if random mode is enabled
  if (isRandom) {
    studentIds = shuffleArray(studentIds);
  }

  // 3. Initialize empty groups
  const groups: Group[] = Array.from({ length: numberOfGroups }, (_, i) => ({
    id: i + 1,
    name: `모둠 ${i + 1}`,
    members: [],
  }));

  // 4. Distribute students (Round-Robin / Deal cards style)
  // This ensures that group sizes differ by at most 1.
  studentIds.forEach((studentId, index) => {
    const groupIndex = index % numberOfGroups;
    groups[groupIndex].members.push(studentId);
  });

  // 5. Sort members within each group for better readability
  groups.forEach(group => {
    group.members.sort((a, b) => a - b);
  });

  return groups;
};
