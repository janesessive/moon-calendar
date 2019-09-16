export const validateField = (name, value)=> {
    const validateTimeZone=(value)=> {
        if (!value) return "required";
        const tz = parseFloat(value);
        if (tz===0) return "";
        if (!tz || isNaN(tz)) return "invalid format";
        if (tz<0||tz>12) return "out of range";
        return "";
      }

      const validateBirthDate=(value)=> {
        if (!value) return "required";
        return "";
      }
    switch (name) {
        case 'timeZone':
            return validateTimeZone(value)
        case 'birthDate':
            return validateBirthDate(value)
        default:
            return ''
    }
}



  