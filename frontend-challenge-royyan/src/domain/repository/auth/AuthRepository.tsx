import AuthorizationResult from "../../entity/auth/structures/AuthorizationResult";
import ValidationResult from "../../entity/auth/structures/ValidationResult";

export default interface AuthRepository {
  /**
   * @throws {Error} if validation has not passed
   */
  validateCredentials(email: string, password: string): Promise<ValidationResult>;

  /**
   * @throws {Error} if credentials have not passed
   */
  login(email: string, password: string, validationKey: string): Promise<AuthorizationResult>;
}