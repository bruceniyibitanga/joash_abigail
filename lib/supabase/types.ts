/**
 * Generated database types.
 *
 * Regenerate after any migration — do not edit by hand.
 * Includes the pre-existing reggie tables (events, bookings, admin_*) because
 * they share this Postgres instance; this app only ever touches wedding_*.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.1";
  };
  public: {
    Tables: {
      admin_auth_audit_log: {
        Row: {
          admin_id: string | null;
          created_at: string;
          email: string;
          event_type: string;
          failure_reason: string | null;
          id: string;
          ip_address: unknown;
          metadata: Json | null;
          session_id: string | null;
          success: boolean;
          user_agent: string | null;
        };
        Insert: {
          admin_id?: string | null;
          created_at?: string;
          email: string;
          event_type: string;
          failure_reason?: string | null;
          id?: string;
          ip_address: unknown;
          metadata?: Json | null;
          session_id?: string | null;
          success: boolean;
          user_agent?: string | null;
        };
        Update: {
          admin_id?: string | null;
          created_at?: string;
          email?: string;
          event_type?: string;
          failure_reason?: string | null;
          id?: string;
          ip_address?: unknown;
          metadata?: Json | null;
          session_id?: string | null;
          success?: boolean;
          user_agent?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "admin_auth_audit_log_admin_id_fkey";
            columns: ["admin_id"];
            isOneToOne: false;
            referencedRelation: "admin_users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "admin_auth_audit_log_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "admin_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      admin_login_attempts: {
        Row: {
          created_at: string;
          email: string;
          failure_reason: string | null;
          id: string;
          ip_address: unknown;
          is_locked: boolean;
          locked_until: string | null;
          success: boolean;
          user_agent: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          failure_reason?: string | null;
          id?: string;
          ip_address: unknown;
          is_locked?: boolean;
          locked_until?: string | null;
          success?: boolean;
          user_agent?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          failure_reason?: string | null;
          id?: string;
          ip_address?: unknown;
          is_locked?: boolean;
          locked_until?: string | null;
          success?: boolean;
          user_agent?: string | null;
        };
        Relationships: [];
      };
      admin_sessions: {
        Row: {
          admin_id: string;
          created_at: string;
          csrf_token: string;
          expires_at: string;
          id: string;
          ip_address: unknown;
          last_activity_at: string;
          remember_me: boolean;
          revoked_at: string | null;
          revoked_reason: string | null;
          session_token: string;
          user_agent: string | null;
        };
        Insert: {
          admin_id: string;
          created_at?: string;
          csrf_token: string;
          expires_at: string;
          id?: string;
          ip_address: unknown;
          last_activity_at?: string;
          remember_me?: boolean;
          revoked_at?: string | null;
          revoked_reason?: string | null;
          session_token: string;
          user_agent?: string | null;
        };
        Update: {
          admin_id?: string;
          created_at?: string;
          csrf_token?: string;
          expires_at?: string;
          id?: string;
          ip_address?: unknown;
          last_activity_at?: string;
          remember_me?: boolean;
          revoked_at?: string | null;
          revoked_reason?: string | null;
          session_token?: string;
          user_agent?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "admin_sessions_admin_id_fkey";
            columns: ["admin_id"];
            isOneToOne: false;
            referencedRelation: "admin_users";
            referencedColumns: ["id"];
          },
        ];
      };
      admin_users: {
        Row: {
          created_at: string;
          created_by: string | null;
          deleted_at: string | null;
          email: string;
          email_verified: boolean;
          full_name: string;
          id: string;
          is_active: boolean;
          last_login: string | null;
          last_login_at: string | null;
          login_count: number;
          modified_by: string | null;
          password_hash: string;
          role: Database["public"]["Enums"]["admin_role"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          email: string;
          email_verified?: boolean;
          full_name?: string;
          id?: string;
          is_active?: boolean;
          last_login?: string | null;
          last_login_at?: string | null;
          login_count?: number;
          modified_by?: string | null;
          password_hash: string;
          role?: Database["public"]["Enums"]["admin_role"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          email?: string;
          email_verified?: boolean;
          full_name?: string;
          id?: string;
          is_active?: boolean;
          last_login?: string | null;
          last_login_at?: string | null;
          login_count?: number;
          modified_by?: string | null;
          password_hash?: string;
          role?: Database["public"]["Enums"]["admin_role"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "admin_users_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "admin_users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "admin_users_modified_by_fkey";
            columns: ["modified_by"];
            isOneToOne: false;
            referencedRelation: "admin_users";
            referencedColumns: ["id"];
          },
        ];
      };
      audit_logs: {
        Row: {
          action: string;
          created_at: string;
          id: string;
          ip_address: string | null;
          metadata: Json | null;
          resource_id: string | null;
          resource_type: string;
          user_agent: string | null;
          user_id: string | null;
        };
        Insert: {
          action: string;
          created_at?: string;
          id?: string;
          ip_address?: string | null;
          metadata?: Json | null;
          resource_id?: string | null;
          resource_type: string;
          user_agent?: string | null;
          user_id?: string | null;
        };
        Update: {
          action?: string;
          created_at?: string;
          id?: string;
          ip_address?: string | null;
          metadata?: Json | null;
          resource_id?: string | null;
          resource_type?: string;
          user_agent?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      bookings: {
        Row: {
          booking_reference: string;
          created_at: string;
          email: string;
          event_id: string;
          id: string;
          name: string;
          number_of_attendees: number;
          phone: string;
          special_requirements: string | null;
          user_id: string | null;
        };
        Insert: {
          booking_reference: string;
          created_at?: string;
          email: string;
          event_id: string;
          id?: string;
          name: string;
          number_of_attendees?: number;
          phone: string;
          special_requirements?: string | null;
          user_id?: string | null;
        };
        Update: {
          booking_reference?: string;
          created_at?: string;
          email?: string;
          event_id?: string;
          id?: string;
          name?: string;
          number_of_attendees?: number;
          phone?: string;
          special_requirements?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "bookings_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
        ];
      };
      events: {
        Row: {
          created_at: string;
          date: string;
          description: string | null;
          id: string;
          image_urls: string[] | null;
          location: string;
          max_capacity: number;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          date: string;
          description?: string | null;
          id?: string;
          image_urls?: string[] | null;
          location: string;
          max_capacity: number;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          date?: string;
          description?: string | null;
          id?: string;
          image_urls?: string[] | null;
          location?: string;
          max_capacity?: number;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      wedding_admins: {
        Row: {
          created_at: string;
          email: string;
          full_name: string;
          id: string;
          is_active: boolean;
          last_login_at: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          full_name?: string;
          id: string;
          is_active?: boolean;
          last_login_at?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          full_name?: string;
          id?: string;
          is_active?: boolean;
          last_login_at?: string | null;
        };
        Relationships: [];
      };
      wedding_rsvps: {
        Row: {
          attendance: Database["public"]["Enums"]["wedding_attendance"];
          created_at: string;
          dietary: string | null;
          email: string;
          full_name: string;
          guest_count: number;
          hymn: string | null;
          id: string;
          message: string | null;
          phone: string | null;
          updated_at: string;
        };
        Insert: {
          attendance: Database["public"]["Enums"]["wedding_attendance"];
          created_at?: string;
          dietary?: string | null;
          email: string;
          full_name: string;
          guest_count?: number;
          hymn?: string | null;
          id?: string;
          message?: string | null;
          phone?: string | null;
          updated_at?: string;
        };
        Update: {
          attendance?: Database["public"]["Enums"]["wedding_attendance"];
          created_at?: string;
          dietary?: string | null;
          email?: string;
          full_name?: string;
          guest_count?: number;
          hymn?: string | null;
          id?: string;
          message?: string | null;
          phone?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      admin_delete_booking: { Args: { booking_uuid: string }; Returns: boolean };
      admin_get_all_bookings: {
        Args: never;
        Returns: {
          booking_reference: string;
          created_at: string;
          email: string;
          event_id: string;
          event_title: string;
          id: string;
          name: string;
          number_of_attendees: number;
          phone: string;
          special_requirements: string;
          user_id: string;
        }[];
      };
      admin_get_booking_stats: {
        Args: never;
        Returns: {
          event_id: string;
          max_capacity: number;
          total_attendees: number;
          total_bookings: number;
        }[];
      };
      cancel_booking_by_reference: { Args: { ref: string }; Returns: boolean };
      cleanup_admin_auth_data: { Args: never; Returns: number };
      count_bookings_for_event: {
        Args: { event_uuid: string };
        Returns: number;
      };
      create_admin_session: {
        Args: {
          p_admin_id: string;
          p_csrf_token: string;
          p_ip_address: unknown;
          p_remember_me?: boolean;
          p_session_token: string;
          p_user_agent: string;
        };
        Returns: string;
      };
      generate_booking_reference: { Args: never; Returns: string };
      get_booking_by_reference: {
        Args: { ref: string };
        Returns: {
          booking_reference: string;
          created_at: string;
          email: string;
          event_date: string;
          event_id: string;
          event_title: string;
          id: string;
          name: string;
          number_of_attendees: number;
          phone: string;
          special_requirements: string;
        }[];
      };
      is_account_locked: { Args: { p_email: string }; Returns: boolean };
      is_event_at_capacity: { Args: { event_uuid: string }; Returns: boolean };
      is_wedding_admin: { Args: never; Returns: boolean };
      log_auth_event: {
        Args: {
          p_admin_id: string;
          p_email: string;
          p_event_type: string;
          p_failure_reason?: string;
          p_ip_address?: unknown;
          p_metadata?: Json;
          p_session_id?: string;
          p_success: boolean;
          p_user_agent?: string;
        };
        Returns: string;
      };
      record_login_attempt: {
        Args: {
          p_email: string;
          p_failure_reason?: string;
          p_ip_address: unknown;
          p_success: boolean;
          p_user_agent: string;
        };
        Returns: undefined;
      };
      revoke_admin_session: {
        Args: { p_reason?: string; p_session_token: string };
        Returns: boolean;
      };
      revoke_all_admin_sessions: {
        Args: { p_admin_id: string; p_reason?: string };
        Returns: number;
      };
      touch_wedding_admin_login: { Args: never; Returns: undefined };
      update_booking_by_reference: {
        Args: {
          new_email: string;
          new_name: string;
          new_number_of_attendees: number;
          new_phone: string;
          new_special_requirements: string;
          ref: string;
        };
        Returns: boolean;
      };
      validate_admin_session: {
        Args: { p_rotate_csrf?: boolean; p_session_token: string };
        Returns: {
          admin_id: string;
          csrf_token: string;
          expires_at: string;
          valid: boolean;
        }[];
      };
    };
    Enums: {
      admin_role: "super_admin" | "admin" | "moderator";
      wedding_attendance: "accepts" | "declines";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database["public"];

export type Tables<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Row"];

export type TablesInsert<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Insert"];

export type TablesUpdate<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Update"];

export type Enums<T extends keyof DefaultSchema["Enums"]> =
  DefaultSchema["Enums"][T];
