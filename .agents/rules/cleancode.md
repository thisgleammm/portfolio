---
trigger: always_on
---

# Clean Code – Function & Naming Rules (Agent Guide)

Code is read far more often than it is written.
Optimize for human understanding, not cleverness.

---

## NAMING PRINCIPLES

### 1. Use Intention-Revealing Names

#### ✅ DO
```java
int elapsedTimeInDays;
boolean isUserAuthenticated();
```

#### ❌ DON'T
```java
int d;
boolean chkUsr();
```

Rule:
- Names must explain intent, not force guessing.
- If a comment is needed to explain the name, the name is wrong.

---

### 2. Avoid Disinformation

#### ✅ DO
```java
List<User> users;
User user;
```

#### ❌ DON'T
```java
User userList; // not a list
int l = 1;     // looks like 1 or I
```

Rule:
- Do not lie through names.
- Do not use visually confusing characters.

---

### 3. Make Meaningful Distinctions

#### ✅ DO
```java
productPrice;
productStock;
productDescription;
```

#### ❌ DON'T
```java
productData;
productInfo;
productObject;
```

Rule:
- Different names must mean different responsibilities.
- Noise words add zero value.

---

### 4. Use Pronounceable Names

#### ✅ DO
```java
generationTimestamp;
userAuthenticationStatus;
```

#### ❌ DON'T
```java
genymdhms;
usrAuthFlg;
```

Rule:
- If it cannot be spoken naturally, rename it.

---

### 5. Use Searchable Names

#### ✅ DO
```java
static final int MAX_LOGIN_ATTEMPTS = 5;
```

#### ❌ DON'T
```java
if (attempts > 5) { ... }
```

Rule:
- Avoid magic numbers.
- Avoid single-letter variables outside small loops.

---

### 6. Avoid Encodings

#### ✅ DO
```java
String userName;
boolean active;
```

#### ❌ DON'T
```java
String strUserName;
boolean bActive;
int m_userAge;
```

Rule:
- Do not encode type, scope, or implementation in names.
- Trust the language and IDE.

---

### 7. Avoid Mental Mapping

#### ✅ DO
```java
int elapsedTimeInDays;
User authenticatedUser;
```

#### ❌ DON'T
```java
int d;    // days
User u;   // user
```

Rule:
- Do not force readers to translate symbols mentally.

---

## FUNCTION DESIGN

### 8. Functions Must Be Small

#### ✅ DO
```java
void processOrder(Order order) {
    validate(order);
    finalizeOrder(order);
}
```

#### ❌ DON'T
```java
void processOrder(Order order) {
    validate(order);
    calculateTotal(order);
    applyDiscount(order);
    save(order);
    sendEmail(order);
}
```

Rule:
- If it feels complete, it is probably too big.
- Prefer many small functions over one large one.

---

### 9. Do One Thing

#### ✅ DO
```java
boolean isPasswordValid(String password);
```

#### ❌ DON'T
```java
boolean validateAndSavePassword(String password);
```

Rule:
- If you describe the function using "and", split it.

---

### 10. Do Not Mix Abstraction Levels

#### ✅ DO
```java
void processOrder(Order order) {
    calculateTotal(order);
}
```

```java
void calculateTotal(Order order) {
    for (Item item : order.getItems()) {
        ...
    }
}
```

#### ❌ DON'T
```java
void processOrder(Order order) {
    for (Item item : order.getItems()) {
        ...
    }
}
```

Rule:
- High-level functions describe *what*.
- Low-level functions describe *how*.
- Never mix them.

---

### 11. Bury Switch Using Polymorphism

#### ✅ DO
```java
employee.calculatePay();
```

```java
class HourlyEmployee extends Employee {
    double calculatePay() { ... }
}
```

#### ❌ DON'T
```java
switch (employee.type) {
    case HOURLY: ...
}
```

Rule:
- Switch should exist only in factories.
- Behavior belongs in objects.

---

## FUNCTION ARGUMENTS

### 12. Keep Argument Count Low

#### ✅ DO
```java
sendEmail(EmailMessage message);
```

#### ❌ DON'T
```java
sendEmail(to, cc, bcc, subject, body, isHtml);
```

Rule:
- More than 3 arguments is a design smell.
- Group related data into objects.

---

### 13. Single Argument Functions

Best for:
- Asking questions
- Transforming data
- Handling events

#### ✅ DO
```java
boolean isActive(User user);
InvoiceDto toDto(Invoice invoice);
void handle(UserRegisteredEvent event);
```

#### ❌ DON'T
```java
process(user, order, status);
```

---

### 14. Argument Pairs & Triads

#### ✅ DO
```java
move(fromPoint, toPoint);
```

#### ❌ DON'T
```java
update(user, isAdmin);
draw(x, y, z);
```

Rule:
- Not all pairs belong together.
- Triads are dangerous.
- Naming can help, but object parameters are better.

---

## SIDE EFFECTS

### 15. Avoid Hidden Side Effects

#### ✅ DO
```java
boolean isValid(User user);
void saveUser(User user);
```

#### ❌ DON'T
```java
boolean validate(User user) {
    saveToDatabase(user); // hidden side effect
    return true;
}
```

Rule:
- Side effects must be explicit and obvious.
- Never hide them behind innocent names.

---

## COMMAND QUERY SEPARATION (CQS)

### 16. Do or Answer, Never Both

#### ✅ DO
```java
void activateUser(User user);
boolean isUserActive(User user);
```

#### ❌ DON'T
```java
boolean activateUser(User user);
```

Rule:
- Commands change state, return nothing.
- Queries return data, change nothing.

---

## FINAL RULE

If a function surprises the reader, it is poorly designed.

Clarity beats cleverness. Always.