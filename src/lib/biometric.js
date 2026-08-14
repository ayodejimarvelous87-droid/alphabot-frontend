import {
  startRegistration,
  startAuthentication
} from "@simplewebauthn/browser";

const API = "https://api.alphabothq.com";


const getToken = () => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("token");
};


/*
========================================
CHECK BIOMETRIC STATUS
========================================
*/

export const getBiometricStatus = async () => {

  const token = getToken();

  if (!token) {
    throw new Error("You are not logged in");
  }

  const res = await fetch(
    `${API}/biometric/status`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || "Unable to check biometric status"
    );
  }

  return data;
};


/*
========================================
ENABLE FINGERPRINT
========================================
*/

export const enableBiometric = async () => {

  const token = getToken();

  if (!token) {
    throw new Error("You are not logged in");
  }


  const optionsRes = await fetch(
    `${API}/biometric/register/options`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


  const options = await optionsRes.json();


  if (!optionsRes.ok) {
    throw new Error(
      options.message ||
      "Unable to start fingerprint setup"
    );
  }


  const registrationResponse =
    await startRegistration({
      optionsJSON: options
    });


  const verifyRes = await fetch(
    `${API}/biometric/register/verify`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },

      body: JSON.stringify(
        registrationResponse
      )
    }
  );


  const data = await verifyRes.json();


  if (!verifyRes.ok) {
    throw new Error(
      data.message ||
      "Fingerprint setup failed"
    );
  }


  return data;
};


/*
========================================
AUTHENTICATE WITH FINGERPRINT
========================================
*/

export const authenticateWithBiometric =
async () => {

  const token = getToken();

  if (!token) {
    throw new Error("You are not logged in");
  }


  const optionsRes = await fetch(
    `${API}/biometric/authenticate/options`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


  const options = await optionsRes.json();


  if (!optionsRes.ok) {
    throw new Error(
      options.message ||
      "Unable to start fingerprint authentication"
    );
  }


  const authenticationResponse =
    await startAuthentication({
      optionsJSON: options
    });


  const verifyRes = await fetch(
    `${API}/biometric/authenticate/verify`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },

      body: JSON.stringify(
        authenticationResponse
      )
    }
  );


  const data = await verifyRes.json();


  if (!verifyRes.ok) {
    throw new Error(
      data.message ||
      "Fingerprint authentication failed"
    );
  }


  if (data.biometricToken) {
    localStorage.setItem(
      "biometricToken",
      data.biometricToken
    );
  }

  return data;
};


/*
========================================
GET BIOMETRIC TOKEN
========================================
*/

export const getBiometricToken = () => {

  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(
    "biometricToken"
  );
};


/*
========================================
CLEAR BIOMETRIC TOKEN
========================================
*/

export const clearBiometricToken = () => {

  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(
    "biometricToken"
  );
};


/*
========================================
DISABLE BIOMETRIC
========================================
*/

export const disableBiometric = async () => {

  const token = getToken();

  if (!token) {
    throw new Error("You are not logged in");
  }


  const res = await fetch(
    `${API}/biometric`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


  const data = await res.json();


  if (!res.ok) {
    throw new Error(
      data.message ||
      "Unable to disable fingerprint"
    );
  }


  return data;
};
