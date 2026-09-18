import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const {
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    } = req.body;

    const payload = {
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    };

    const result = await vehicleService.createVehicle(payload);

    if (result.rows.length) {
      return res.status(200).json({
        success: true,
        message: "Vehicle created successfully",
        data: result.rows[0],
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create vehicle",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getVehicles();

    if (result.rows.length) {
      return res.status(200).json({
        success: true,
        message: "Vehicles retrieved successfully",
        data: result.rows,
      });
    }

    return res.status(404).json({
      success: false,
      message: "No vehicles found",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve vehicles",
    });
  }
};

const getVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    const result = await vehicleService.getVehicle(vehicleId as string);

    if (result.rows.length) {
      return res.status(200).json({
        success: true,
        message: "Vehicle retrieved successfully",
        data: result.rows[0],
      });
    }

    return res.status(404).json({
      success: false,
      message: "Vehicle not found",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve vehicle",
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    const result = await vehicleService.deleteVehicle(vehicleId as string);

    if (result.rowCount) {
      return res.status(200).json({
        success: true,
        message: "Vehicle deleted successfully",
      });
    }

    return res.status(404).json({
      success: false,
      message: "Vehicle not found",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete vehicle",
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    const result = await vehicleService.updateVehicle({
      ...req.body,
      vehicleId,
    });

    if (result.rowCount) {
      return res.status(200).json({
        success: true,
        message: "Vehicle updated successfully",
        data: result.rows[0],
      });
    }

    return res.status(404).json({
      success: false,
      message: "No vehicles found",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Failed to update vehicle",
    });
  }
};

export const vehicleController = {
  createVehicle,
  getVehicles,
  getVehicle,
  deleteVehicle,
  updateVehicle,
};
