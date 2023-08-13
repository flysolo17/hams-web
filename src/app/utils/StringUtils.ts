export const TOKEN_KEY: string =
  'TAyMjgtNDAzMy1hODdhLTdiMzY0M2M1MDQ1MSIsImlhdCI6MTY4OTE1MzE3OH0';
export const STORAGE = 'http://localhost:3000/uploads/';
export function convertFileToBlob(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      const blob = new Blob([event.target.result], { type: file.type });
      resolve(blob);
    };
    reader.onerror = (event: any) => {
      reject(event.target.error);
    };

    reader.readAsArrayBuffer(file);
  });
}
export function formatDateTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZoneName: 'short',
    timeZone: 'UTC', // Add this line to keep the date in UTC
  };

  return date.toLocaleString('en-US', options);
}
export function getAge(birthdate: string): number {
  const today = new Date();
  const birthDate = new Date(birthdate);

  // Calculate the age
  let age = today.getFullYear() - birthDate.getFullYear();

  // Check if the birth month is after the current month or if it's the current month but the birth day is after today's day
  const birthMonth = birthDate.getMonth();
  const currentMonth = today.getMonth();
  const birthDay = birthDate.getDate();
  const currentDay = today.getDate();

  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    age--;
  }
  return age;
}

// export function formatDate(dateString: string) {
//   const options: Intl.DateTimeFormatOptions = {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: '2-digit',
//     second: '2-digit',
//     hour12: true,
//     timeZoneName: 'short',
//   };

//   const formattedDate = new Date(dateString).toLocaleString('en-US', options);
//   return formattedDate;
// }
